# node-mysql-demo

一个node 操作 mysql 的例子

例子中封装了 nodejs  操作 mysql 常用函数

该例子中的数据库的表格格式如下：

名称： game

属性：

```
GAME_ID INT 11

GAME_NAME VARCHAR 100

GAME_DESC VARCHAR 100
```

####1. 需要在本地的mysql中创建一个上述的表格 GAME

####2. 下载本项目后，需要修改server/config/config.js文件，指向本地的mysql数据库

####3. 启动

```
  node server
```

PS：connect使用了较旧的版本
