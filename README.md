## 基于Layui的评论插件(支持微博表情,插入图片,插入代码)
因为是基于Layui的,所以你还需要引入layui框架,代码示例:
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="./plugins/layui/css/layui.css">
		<link rel="stylesheet" href="css/perfreeRevert.css">
		<title></title>
	</head>
	<body>
		<div id="perfree" class="send-revert-box">
			
		</div>
		<script src="./plugins/layui/layui.js"></script>
		<script src="./js/perfreeRevert.js"></script>
		<script>
			revert.initRevert({
				id:"perfree",
				width:"541px",
				height:"150px",
				tip:"请输入评论内容",
				uploadUrl:"http://xxxxxx.xx",
				tools:[
					'emjoi','image','code'
				]
			});
		</script>
	</body>
</html>

```
revert.initRevert初始化插件,目前支持的参数如下:
```
id:要放置插件的容器id
width:插件宽度
height:插件高度
tip:插件默认提示文本
uploadUrl:图片上传地址
tools:要显示哪些功能,目前功能有emjoi,image,code,link

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
## 插件展示
[![](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yEeAGUBbAAASoI0drIA104.jpg)](https://www.yinpengfei.com/group1/M00/00/02/rB802lv8yEeAGUBbAAASoI0drIA104.jpg)
