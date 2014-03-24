var static = require("node-static"),
    http = require("http"),
    file = new(static.Server)(),
    port = 2013;

http.createServer(function (req, res) {
    file.serve(req, res);
}).listen(port);