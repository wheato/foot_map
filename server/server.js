var http = require('http'),
    url = require('url');
    route = require('./route');

exports.runServer = function(port){
    port = port || 8888;
    http.createServer(function(req, res){
        handleRequest(req, res);
    }).listen(port);
    console.log('Server running at http://127.0.0.1:' + port + '/');
}

var handleRequest = function(req,res){
    routeHandler(req, res)
};

var routeHandler = function(req, res){
    route.handler(req, res);
};

