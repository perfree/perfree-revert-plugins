## 基于Layui的评论插件(支持微博表情,插入图片,插入代码)
该插件样式模仿至Fly社区
因为是基于Layui的,所以你还需要引入layui框架,代码示例:
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="./plugins/layui/css/layui.css">
		<link rel="stylesheet" href="./css/perfreeRevert.min.css">
		<link rel="stylesheet" href="./plugins/highlight/styles/atom-one-light.css"/>
		<title></title>
	</head>
	<body>
		<!-- 声明容器,存放评论框 -->
		<div id="perfree" class="send-revert-box">

		</div>

		<a id="getVal" style="margin-left: 20px;" href="javascript:;">获取值</a>
		<!-- 结果展示 -->
		<div class="result-box" style="width: 566px;margin-top: 20px;">
		</div>
		<script src="./plugins/layui/layui.js"></script>
		<script src="./plugins/highlight/highlight.pack.js"></script>
		<script>
			layui.config({
				base: './js/'//评论插件存放的目录
			}).use(['jquery','revert'],function () {
				var $ = layui.$;
				revert = layui.revert;
				//初始化
				revert.initRevert({
					el:"#perfree",
					width: "541px",
					height: "150px",
					tip: "请输入评论内容",
					uploadUrl: "http://xxxxxx.xx",
					tools: [
						'emjoi', 'image', 'code', 'link'
					]
				});
				$("#getVal").on("click",function(){
					//获取结果
					var result = revert.getRevertVal();
					console.log(result.val);
					$(".result-box").append(result.val);
					hljs.initHighlighting();
				});
			});
		</script>
	</body>
</html>
```
revert.initRevert初始化插件(前提是引入layui),目前支持的参数如下:
```
el:要放置插件的容器
width:插件宽度
height:插件高度
tip:插件默认提示文本
uploadUrl:图片上传地址
tools:要显示哪些功能,目前功能有emjoi,image,code,link
示例:
layui.config({
		base: './js/'//评论插件存放的目录
	}).use(['jquery','revert'],function () {
		var $ = layui.$;
		revert = layui.revert;
		//初始化
		revert.initRevert({
			el:"#perfree",
			width: "541px",
			height: "150px",
			tip: "请输入评论内容",
			uploadUrl: "http://xxxxxx.xx",
			tools: [
				'emjoi', 'image', 'code', 'link'
			]
		});
```
### 图片上传后台处理
插件会向后台传入name=perfreeImage的file文件,后台只需像普通file上传接收就行,返回参数如下:
```
{
	flag:"",//状态,0上传成功,1失败
	url:"",//图片保存的url
	msg:""//上传失败提示信息
}
```
### 获取最终值
```
revert.getRevertVal()即可获取最终值,返回结果如下:
{
	val:"",//解析后的评论内容
	notImg:["",""]用户没有使用到的图片,就是说,用户上传了该图片但又删掉了,如果你想在服务器一并删除,可以接收此参数进行删除
}
示例:
//获取结果
var result = revert.getRevertVal();
console.log(result.val);
console.log(result.notImg);
```
## 插件展示
[![](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yEeAGUBbAAASoI0drIA104.jpg)](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yEeAGUBbAAASoI0drIA104.jpg)

[![](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yN6AZ5JDAAGDM7wnvSg328.jpg)](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yN6AZ5JDAAGDM7wnvSg328.jpg)
