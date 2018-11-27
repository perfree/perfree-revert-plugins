(function($) {
	var revert = function() {}
	var emjoi = '<span href="javascript:;" class="perfree-emjoi"><i class="layui-icon">&#xe6af;</i> </span>';
	var image = '<span href="javascript:;"><i class="layui-icon">&#xe64a;</i> </span>';
	var link = '<span href="javascript:;"><i class="layui-icon">&#xe64d;</i> </span>';
	var code = '<span href="javascript:;"><i class="layui-icon">&#xe64e;</i> </span>';
	revert.prototype = {
		initRevert: function(data) {
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
				$(".perfree-emjoi").on('click',function(){
					var X = $(".perfree-emjoi").offset().top;
					var Y = $(".perfree-emjoi").offset().left;
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
							  offset: [X+41, Y],
							  fixed: false,
							  content: emjoiIcon
							});
							flow.lazyimg(); 
						}
					});
				})
			})
		},
		selectEmjoi: function(obj){
			layui.use(['jquery','layer'], function() {
				var $ = layui.$;
				var layer = layui.layer;
				var revertVal = $(".perfree-revert-txt").val()+$(obj).attr("title");
				$(".perfree-revert-txt").val(revertVal);
				layer.close(layer.index);
			})
		}
	}
	window.revert = new revert();
})(window.jQuery);