const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 启用CORS
app.use(cors());

// 静态文件服务
app.use(express.static('.'));

// 代理配置
app.use('/api', createProxyMiddleware({
    target: 'https://qianfan.baidubce.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    onProxyReq: (proxyReq, req, res) => {
        // 添加必要的请求头
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('X-Appbuilder-Authorization', 'Bearer bce-v3/ALTAK-B8ir2mKtEtqQhv8HzOQBy/a66cad6c52fe385c790f8f63ffde3078f711b47e');
    }
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 