(function($) {
	var revert = function() {}
	var emjoi = '<span href="javascript:;"><i class="layui-icon">&#xe6af;</i> </span>';
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
			layui.use(['jquery'], function() {
				var $ = layui.$;
				$("#" + data.id).append(revertHtml);
			})
		},
	}
	window.revert = new revert();
})(window.jQuery);
