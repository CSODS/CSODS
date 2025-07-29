const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://192.168.100.25:3001", // your backend
      changeOrigin: true,
    })
  );
};
