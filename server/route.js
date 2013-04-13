var controller = require('./controller'),
    url = require('url');


exports.handler = function(req, res){
    var path = url.parse(req.url).pathname,
        method = req.method || 'get';
    var action = map[path];
    var ct = new controllerContext(req, res);
    if(!action){
        return ct.render404();
    }
    return controller[action].call(ct);
};

var map = {
    '/' : 'index',
    '/timeline' : 'getWeibo',
    '/reqcode' : 'reqCode'
}

var controllerContext = function(req, res){
    this.req = req;
    this.res = res;
    this.render404 = render404;
    this.render500 = render500;
    this.token;
}
controllerContext.prototype.render = function(obj){
    this.res.writeHead(200, {'Content-Type' : 'application/json; charset=UTF-8', 'Date' : new Date().toUTCString(), 'Expires' : new Date().toUTCString(), 'Cache-Control' : 'private, max-age=0', 'Access-Control-Allow-Origin' : 'http://127.0.0.1:80', 'Access-Control-Allow-Credentials' : 'true'});
    if(typeof(obj) === 'object') {
        this.res.end(JSON.stringify(obj));
    } else {
        this.res.end();
    }

}