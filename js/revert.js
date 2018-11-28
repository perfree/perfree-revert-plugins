/**
 * Perfree
 */
layui.define(['jquery', 'layer', 'flow'],function (exports) {
	var layer = layui.layer;
	var $ = layui.$;
	var flow = layui.flow;
	var X, Y, width,height;
	var imageList = new Array();
	var emjoiList = new Array();
	var obj = {
		/**初始化*/
		initRevert: function(data) {
			/**顶部tools*/
			var emjoi = '<span href="javascript:;" class="perfree-emjoi" onclick="revert.emjoiPopup();"><i class="layui-icon">&#xe6af;</i> </span>';
			var image = '<span href="javascript:;" class="perfree-image" onclick="revert.imagePopup();"><i class="layui-icon">&#xe64a;</i></span>' 
						+'<form id="perfree_image_form" enctype="multipart/form-data">'
						+'<input type="file" name="perfreeImage" style="display:none;" onchange="revert.addImage(this,\'' +data.uploadUrl + '\')"/>'
						+'</form>';
			var link = '<span href="javascript:;" class="perfree-link" onclick="revert.linkPopup();"><i class="layui-icon">&#xe64d;</i> </span>';
			var code = '<span href="javascript:;" class="perfree-code" onclick="revert.codePopup();"><i class="layui-icon">&#xe64e;</i> </span>';
			/**提示文本*/
			var tip;
			if (data.tip == null || data.tip == "") {
				tip = "请输入内容";
			} else {
				tip = data.tip;
			}
			/**工具栏*/
			var toolsBox = '<div class="layui-card perfree-revert-box" style="width:' + data.width + ';"><div class="layui-card-header perfree-revert-tools">';
			/**输入框*/
			var contentBox = '</div>'
							+'<div class="layui-card-body perfree-revert-txtBox">'
							+'<form class="perfree-revert-form" action="">'
							+'<textarea name="desc" placeholder="' + tip + '" class="layui-textarea perfree-revert-txt" style="height:'+data.height +';"></textarea>'
							+'</form>'
							+'</div>'
							+'</div>';
			var revertHtml;
			/**如果传入的data.tools为空,使用默认布局*/
			if (data.tools == null) {
				revertHtml = toolsBox + emjoi + image + link + code + contentBox;
			} else {
				revertHtml = toolsBox;
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
				revertHtml += contentBox;
			}
			/**将评论框追加至声明的容器*/
			$(data.el).append(revertHtml);
			/**将坐标,宽高赋值*/
			X = $(".perfree-revert-box").offset().top;
			Y = $(".perfree-revert-box").offset().left;
			width = $(".perfree-revert-box").width() / 2;
			height = $(".perfree-revert-box").height() / 2;
		},
		/**工具栏emjoi点击显示弹出层*/
		emjoiPopup: function(){
			var app_id = '1362404091';
			$.ajax({
				dataType: 'jsonp',
				url: 'https://api.weibo.com/2/emotions.json?source=' + app_id,
				success: function(result) {
					emjoiList = result.data;
					var emjoiIcon = '<ul class="perfree-emjoi-icon-box">';
					for (var i = 0; i < result.data.length; i++) {
						if (result.data[i].category == "") {
							emjoiIcon += '<li title="' + result.data[i].phrase +'" class="perfree-emjoi-icon" onclick="revert.selectEmjoi(this);">'
										+'<img lay-src=' + result.data[i].url +'>'
										+'</li>';
						}
					}
					emjoiIcon += '</ul>';
					layer.open({
						type: 1,
						title: false,
						closeBtn: 0,
						shade: .01,
						area: width + "px",
						shadeClose: true,
						offset: [X + 41, Y + 2],
						fixed: false,
						content: emjoiIcon
					});
					flow.lazyimg();
				}
			});
		},
		/**工具栏图片上传点击选择图片*/
		imagePopup: function(){
			$("input[name='perfreeImage']").click();
		},
		/**工具栏插入代码点击显示弹出层*/
		codePopup: function(){
			var width = $(window).width();
			if (width < 900) {
				width = $(window).width() * 0.8;
			} else {
				width = $(window).width() * 0.6;
			}
			var height = $(window).height() * 0.4;
			var content ='<div class="code-box">'
						+'<textarea name="code" placeholder="粘贴你的代码" class="layui-textarea perfree-code-text" style="height:' +height + 'px;"></textarea>'
						+'</div>';
			layer.open({
				type: 1,
				title: "插入代码",
				closeBtn: 1,
				shade: .01,
				shadeClose: true,
				fixed: false,
				content: content,
				area: width + "px",
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					var oldRevertVal = $(".perfree-revert-txt").val();
					var codeValue;
					if(oldRevertVal == null || oldRevertVal == ""){
						codeValue = "<codes>\n" + $(".perfree-code-text").val() + '\n</codes>';
					}else{
						codeValue = "\n<codes>\n" + $(".perfree-code-text").val() + '\n</codes>';
					}
					var revertVal = oldRevertVal + codeValue;
					$(".perfree-revert-txt").val(revertVal);
					$(".perfree-revert-txt").focus();
					layer.close(index);
				}
			});
		},
		/**工具栏插入链接点击显示弹出层*/
		linkPopup: function(){
			var content ='<div class="link-box">'
						+'<input name="link" placeholder="输入链接" class="layui-input perfree-link-text" style="height:35px;" autocomplete="off" lay-verify="url"></input>'
						+'</div>';
			layer.open({
				type: 1,
				title: "插入链接",
				closeBtn: 1,
				shade: .01,
				area: width + "px",
				shadeClose: true,
				offset: [X + 41, Y + 2],
				fixed: false,
				btn: ['确定'],
				content: content,
				yes: function(index, layero) {
					var reg = /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
					if (reg.test($(".perfree-link-text").val()) != true) {
						layer.tips('请输入正确的链接', '.perfree-link-text', {
							tips: 3
						});
					} else {
						var revertVal = $(".perfree-revert-txt").val() + "\n" + $(".perfree-link-text").val();
						$(".perfree-revert-txt").val(revertVal + "\n");
						$(".perfree-revert-txt").focus();
						layer.close(index);
					}
				}
			});
		},
		/**选中emjoi*/
		selectEmjoi: function(obj) {
			var revertVal = $(".perfree-revert-txt").val() + $(obj).attr("title");
			$(".perfree-revert-txt").val(revertVal);
			layer.close(layer.index);
		},
		/**上传图片*/
		addImage: function(obj, url) {
			layer.load(0, {
				offset: [X + height, Y + width - 50]
			});
			$.ajax({
				url: url,
				type: "post",
				dataType: "json",
				cache: false,
				data: new FormData($("#perfree_image_form")[0]),
				processData: false,
				contentType: false,
				success: function(data) {
					layer.close(layer.index);
					if (data.flag == 0) {
						var revertVal = $(".perfree-revert-txt").val() + "\n<图片:" + data.url + ">";
						imageList.push('<img alt="image" src="'+data.url+'" class="revert-image">');
						$(".perfree-revert-txt").val(revertVal + "\n");
						$(".perfree-revert-txt").focus();
					} else {
						layer.msg(data.msg, {
							time: 1000,
							icon: 5
						});
					}
				},
				error: function() {
					layer.close(layer.index);
					layer.msg("服务器异常", {
						time: 1000,
						icon: 5
					});
				}
			})
		},
		/**获取最终值*/
		getRevertVal: function(){
			var result={};
			var val = $(".perfree-revert-txt").val();
			/**添加图片链接,去除无用图片*/
			var notImgs = new Array();
			for(var i = 0;i<imageList.length;i++){
				if(val.indexOf(imageList[i]) != -1){
					val = val.replace('<图片:'+imageList[i]+'>',imageList[i]);
				}else{
					notImgs.push(imageList[i]);
				}
			}
			/**将用户已上传但未使用的图片存入结果集*/
			if(notImgs.length > 0 && notImgs != null){
				result["notImg"]=notImgs;
			}
			/**装饰代码*/
			for(var i = 1;i > 0;i++){
				var start = val.indexOf("<codes>\n");
				if(start == -1){
					break;
				}else{
					var end = val.indexOf("\n</codes>");
					var oldCode = val.substring(start+7,end);
					var codeLtRegx = /</g;
					var codeGtRegx = />/g;
					var newCode = oldCode.replace(codeLtRegx,'&lt;').replace(codeGtRegx,'&gt;');
					val = val.replace(oldCode,newCode).replace("<codes>\n",'<pre><code>').replace("\n</codes>",'</code></pre>');
				}
			}
			/**优化换行符*/
			var lineRegx=/\n/g;
			val = val.replace(lineRegx,'<br>');
			/**将表情文字替换为表情图片链接*/
			for(var j = 0;j<emjoiList.length;j++){
				if(val.indexOf(emjoiList[j].value) != -1){
					val = val.replace(emjoiList[j].value,'<img alt="'+emjoiList[j].value+'" src="'+emjoiList[j].url+'" class="emjoi-img">');
				}
			}
			/**放入结果集并返回*/
			result["val"]=val;
			return result;
		}
	}
	exports("revert",obj);
});