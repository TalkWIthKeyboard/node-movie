## node-movie
该项目是以**node.js**的**express**框架为基础实现的电影网站。<br/>（<font color=red>**node.js学习项目**</font>）

## 使用
### 依赖安装
+ 确保 **git** 环境
+ 确保 **node.js** 环境
+ 首先在本地的workspace中初始化git环境，并进行clone

```
$ git init
$ git clone https://github.com/TalkWIthKeyboard/node-movie.git
```
+ 使用package.json安装node的包依赖
	+ 查看package.json中的 **dependencies** 字段
	+ 通过npm命令依次全部安装
	
```
$ npm install xxx
```

+ 使用bower.json安装前端的包依赖
	+ 查看bower.json中的 **dependencies** 字段 
	+ 通过bower命令依次全部安装
	+ 安装的默认路径在 **.bowerrc** 中设置
	
```
$ bower install xxx
```
### 使用方法
#### 本地调试
+ 进入项目目录

```
$ node app.js
```

+ 默认入口

```
http://localhost:3000/
```
