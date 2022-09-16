const { createProxyMiddleware } = require("http-proxy-middleware/dist");



module.exports = function (app) {
    app.use(createProxyMiddleware("/testingapi/getgigs", {
        target: "http://localhost",
        changeOrigin: true
    }));
}