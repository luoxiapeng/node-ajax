'use strict'
const http = require('http');
const fs = require('fs');
const url = require('url');

const path = require('path');
const querystring = require('querystring');


//创建一个http服务器
const server = http.createServer();
//监听了一个请求事件request,response
server.on('request', (req, res) => {
  let urlObj = url.parse(req.url, true);
  let query = urlObj.query;
  let pathname = urlObj.pathname;
  if (pathname == '/' && req.method == 'GET') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }
  else if (pathname == '/jquery.js' && req.method == 'GET') {
    fs.readFile(path.join(__dirname, 'jquery.js'), (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  }
  else if (pathname == '/getData' && req.method == 'POST') {
    let data = '';
    // 接收 post 方式提交的数据
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      console.log(data);
      //querystring核心模块
      let obj = querystring.parse(data);
      console.log(obj);
      let send = {
       "message": "成功"
      };
      let sendStr = JSON.stringify(send);
      let sendBuf = new Buffer(sendStr);
      res.end(sendBuf);
    });
  }
  else if (pathname == '/getData' && req.method == 'GET') {


    console.log(query);

    
    let send = {
      "message": "成功"
    };
    let sendStr = JSON.stringify(send);
    let sendBuf = new Buffer(sendStr);
    res.end(sendBuf);
  }
  else {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    //向浏览器去写数据
    res.write('<h1>404</h1>');
    //响应结束
    res.end();
  }
});

server.listen(3000);




