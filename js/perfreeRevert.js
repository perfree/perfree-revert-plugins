(function($) {
	var images = new Array();
	var emjois = new Array();
	var revert = function() {}
	revert.prototype = {
		/**初始化*/
		initRevert: function(data) {
			var emjoi = '<span href="javascript:;" class="perfree-emjoi"><i class="layui-icon">&#xe6af;</i> </span>';
			var image = '<span href="javascript:;" class="perfree-image"><i class="layui-icon">&#xe64a;</i></span>' +
				'<form id="perfree_image_form" enctype="multipart/form-data"><input type="file" name="perfreeImage" style="display:none;" onchange="revert.addImage(this,\'' +
				data.uploadUrl + '\')"/></form>';
			var link = '<span href="javascript:;" class="perfree-link"><i class="layui-icon">&#xe64d;</i> </span>';
			var code = '<span href="javascript:;" class="perfree-code"><i class="layui-icon">&#xe64e;</i> </span>';
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
			layui.use(['jquery', 'layer', 'flow'], function() {
				var layer = layui.layer;
				var $ = layui.$;
				var flow = layui.flow;
				$("#" + data.id).append(revertHtml);
				/**emjoi弹出层*/
				$(".perfree-emjoi").on('click', function() {
					var X = $(".perfree-emjoi").offset().top;
					var Y = $(".perfree-revert-box").offset().left;
					var width = $(".perfree-revert-box").width() / 2;
					var app_id = '1362404091';
					$.ajax({
						dataType: 'jsonp',
						url: 'https://api.weibo.com/2/emotions.json?source=' + app_id,
						success: function(result) {
							emjois = result.data;
							var emjoiIcon = '<ul class="perfree-emjoi-icon-box">';
							for (var i = 0; i < result.data.length; i++) {
								if (result.data[i].category == "") {
									emjoiIcon += '<li title="' + result.data[i].phrase +
										'" class="perfree-emjoi-icon" onclick="revert.selectEmjoi(this);"><img lay-src=' + result.data[i].url +
										'></li>';
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
				});
				/**图片上传弹出层*/
				$(".perfree-image").on('click', function() {
					$("input[name='perfreeImage']").click();
				});
				/**插入代码弹出层*/
				$(".perfree-code").on('click', function() {
					var width = $(window).width();
					if (width < 900) {
						width = $(window).width() * 0.8;
					} else {
						width = $(window).width() * 0.6;
					}
					var height = $(window).height() * 0.4;
					var content =
						'<div class="code-box"><textarea name="code" placeholder="粘贴你的代码" class="layui-textarea perfree-code-text" style="height:' +
						height + 'px;"></textarea></div>';
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
							var codeValue = "<pre>" + $(".perfree-code-text").val() + '</pre>\n';
							var revertVal = $(".perfree-revert-txt").val() + codeValue;
							$(".perfree-revert-txt").val(revertVal);
							layer.close(index);
						}
					});
				});
				/**插入链接弹出层*/
				$(".perfree-link").on('click', function() {
					var X = $(".perfree-revert-box").offset().top;
					var Y = $(".perfree-revert-box").offset().left;
					var width = $(".perfree-revert-box").width() / 2;
					var content =
						'<div class="link-box"><input name="link" placeholder="输入链接" class="layui-input perfree-link-text" style="height:35px;" autocomplete="off" lay-verify="url"></input></div>';
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
				});
			})
		},
		/**选中emjoi*/
		selectEmjoi: function(obj) {
			layui.use(['jquery', 'layer'], function() {
				var $ = layui.$;
				var layer = layui.layer;
				var revertVal = $(".perfree-revert-txt").val() + $(obj).attr("title");
				$(".perfree-revert-txt").val(revertVal);
				layer.close(layer.index);
			})
		},
		/**上传图片*/
		addImage: function(obj, url) {
			layui.use(['jquery', 'layer'], function() {
				var $ = layui.$;
				var layer = layui.layer;
				var X = $(".perfree-revert-box").offset().top;
				var Y = $(".perfree-revert-box").offset().left;
				var width = $(".perfree-revert-box").width() / 2;
				var height = $(".perfree-revert-box").height() / 2;
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
							images.push(data.url);
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
			})
		},
		/**获取最终值*/
		getRevertVal: function(){
			var result={};
			layui.use(['jquery', 'layer'], function() {
				var $ = layui.$;
				var val = $(".perfree-revert-txt").val();
				/**生成图片*/
				var notImgs = new Array();
				for(var i = 0;i<images.length;i++){
					if(val.indexOf(images[i]) != -1){
						val = val.replace('<图片:'+images[i]+'>',images[i]);
					}else{
						notImgs.push(images[i]);
					}
				}
				if(notImgs.length > 0 && notImgs != null){
					result["notImg"]=notImgs;
				}
				/**装饰代码*/
				var reg1=/<pre>/g;
				val = val.replace(reg1,'<pre class="layui-code">');
				/**优化换行符*/
				var reg2=/\n/g;
				val = val.replace(reg2,'<br>');
				/**替换表情*/
				for(var j = 0;j<emjois.length;j++){
					if(val.indexOf(emjois[j].value) != -1){
						val = val.replace(emjois[j].value,'<img alt="'+emjois[j].value+'" src="'+emjois[j].url+'" class="emjoi-img">');
					}
				}
				result["val"]=val;
				
			});
			return result;
		},
	}
	window.revert = new revert();
})(window.jQuery);
