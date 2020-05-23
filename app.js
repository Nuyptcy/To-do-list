//開啟web伺服器
var http = require('http');
http.createServer(function(request,response){
  //res收到資料後回傳
  //request 讀者讀到網站時就會收到資料
  //"text/html"
  response.writeHead(200,{"content-Type":"text/html"})
  response.write("hello");
  response.end();
}).listen(8080)
//port
/*
localhost 本地主機
對應ip
127.0.0.1 自己電腦開啟的伺服器
21 ftp
8080 http 測試
3389 遠端桌面 */
