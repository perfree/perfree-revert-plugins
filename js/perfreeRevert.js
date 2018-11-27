(function($) {
	var revert = function() {}
	revert.prototype = {
		//初始化
		initRevert: function(data) {
			var emjoi = '<span href="javascript:;" class="perfree-emjoi"><i class="layui-icon">&#xe6af;</i> </span>';
			var image = '<span href="javascript:;" class="perfree-image"><i class="layui-icon">&#xe64a;</i></span>'+
				'<form id="perfree_image_form" enctype="multipart/form-data"><input type="file" name="perfreeImage" style="display:none;" onchange="revert.addImage(this,\''+data.uploadUrl+'\')"/></form>';
			var link = '<span href="javascript:;"><i class="layui-icon">&#xe64d;</i> </span>';
			var code = '<span href="javascript:;"><i class="layui-icon">&#xe64e;</i> </span>';
			var revertHtml;
			var tip;
			if (data.tip == null || data.tip == "") {
				tip = "请输入内容";
			} else {
				tip = data.tip;
			}
			var top = '<div class="layui-card perfree-revert-box" style="width:' + data.width + ';">' +
				'<div class="layui-card-header perfree-revert-tools">';
			var bottom = '</div>' +
				'<div class="layui-card-body perfree-revert-txtBox">' +
				'<form class="perfree-revert-form" action="">' +
				'<textarea name="desc" placeholder="' + tip + '" class="layui-textarea perfree-revert-txt" style="height:' +
				data.height +
				';"></textarea>' +
				'</form>' +
				'</div>' +
				'</div>';
			if (data.tools == null) {
				revertHtml = top + emjoi + image + link + code + bottom;
			} else {
				revertHtml = top;
				for (var i = 0; i < data.tools.length; i++) {
					switch (data.tools[i]) {
						case 'emjoi':
							revertHtml += emjoi;
							break;
						case 'image':
							revertHtml += image;
							break;
						case 'link':
							revertHtml += link;
							break;
						case 'code':
							revertHtml += code;
							break;
					}
				}
				revertHtml += bottom;
			}
			layui.use(['jquery','layer','flow'], function() {
				var layer = layui.layer;
				var $ = layui.$;
				var flow = layui.flow;
				var emjoiList;
				$("#" + data.id).append(revertHtml);
				//emjoi弹出层
				$(".perfree-emjoi").on('click',function(){
					var X = $(".perfree-emjoi").offset().top;
					var Y = $(".perfree-revert-box").offset().left;
					var width = $(".perfree-revert-box").width()/2;
					var app_id = '1362404091';
					$.ajax( {
						dataType : 'jsonp',
						url : 'https://api.weibo.com/2/emotions.json?source=' + app_id,
						success : function(result) {
							emjoiList = result.data;
							var emjoiIcon='<ul class="perfree-emjoi-icon-box">';
							for(var i=0;i<result.data.length;i++){
								if(result.data[i].category == ""){
									emjoiIcon+='<li title="'+result.data[i].phrase+'" class="perfree-emjoi-icon" onclick="revert.selectEmjoi(this);"><img lay-src='+result.data[i].url+'></li>';
								}
							}
							emjoiIcon+='</ul>';
							layer.open({
							  type: 1,
							  title: false,
							  closeBtn: 0,
							  shade: .01,
							  area: width+"px",
							  shadeClose: true,
							  skin: 'yourclass',
							  offset: [X+41, Y+2],
							  fixed: false,
							  content: emjoiIcon
							});
							flow.lazyimg(); 
						}
					});
				});
				//图片上传弹出层
				$(".perfree-image").on('click',function(){
					$("input[name='perfreeImage']").click();
				});
			})
		},
		//选中emjoi
		selectEmjoi: function(obj){
			layui.use(['jquery','layer'], function() {
				var $ = layui.$;
				var layer = layui.layer;
				var revertVal = $(".perfree-revert-txt").val()+$(obj).attr("title");
				$(".perfree-revert-txt").val(revertVal);
				layer.close(layer.index);
			})
		},
		//上传图片
		addImage: function(obj,url){
			layui.use(['jquery','layer'], function() {
				var $ = layui.$;
				var layer = layui.layer;
				var X = $(".perfree-revert-box").offset().top;
				var Y = $(".perfree-revert-box").offset().left;
				var width = $(".perfree-revert-box").width()/2;
				var height = $(".perfree-revert-box").height()/2;
				layer.load(0,{
					offset: [X+height, Y+width-50]
				});
				$.ajax({
					url: url,
					type: "post",
					dataType: "json",
					cache: false,
					data: new FormData($("#perfree_image_form")[0]),
					processData: false,
					contentType: false,
					success: function(data){
						layer.close(layer.index);
						if(data.flag==0){
							var revertVal = $(".perfree-revert-txt").val()+data.url;
							$(".perfree-revert-txt").val(revertVal);
						}else{
							layer.msg(data.msg, {time: 1000, icon:5});
						}
					},
					error:function(){
						layer.close(layer.index);
						layer.msg("服务器异常", {time: 1000, icon:5});
					}
				})
			})
		}
	}
	window.revert = new revert();
})(window.jQuery);