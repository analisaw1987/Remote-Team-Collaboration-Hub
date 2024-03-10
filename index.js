const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket连接处理
wss.on('connection', (ws) => {
  // 监听消息
  ws.on('message', (message) => {
    // 广播消息给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// 处理根路径的请求，返回协作页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动Express应用程序
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
