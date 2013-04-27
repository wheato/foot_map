var weibo = require('./lib/weibo'),
    querystring = require('querystring'),
    url = require('url');

var req_opt = {};

exports.index = function(){

}

exports.getToken = function(){
    var req = this.req;
    var postData = '';
    var context = this;
    if(req.method === 'POST'){
        req.addListener('data', function(chunck){
            postData += chunck;
        });
        req.addListener('end', function(){
           console.log(postData);
           postData = querystring.parse(postData);
           for(data in postData){
               req_opt[data] = postData[data];
           }

           weibo.reqToken(req_opt, function(data){
               data = querystring.parse(data);
               req_opt['access_token'] = data['access_token'];
               console.log(data);
               context.render(data);
           });
        });
    }
}

exports.getWeibo = function(){
    var req = this.req;
    var res = this.res;
    var postData = '';
    var context = this;
    if(req.method === 'POST'){
        req.addListener('data', function(chunck){
            postData += chunck;
        });
        req.addListener('end', function(){
            postData = JSON.parse(postData);
            if(postData.method === 'topic'){
                weibo.getBytopic(postData, function(data){
                    context.render(data);
                });
            }
            weibo.getTimelineAll(postData, function(data){
                /*
                res.setHeader("Access-Control-Allow-Origin", "http:127.0.0.1");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");
                res.setHeader("Access-Control-Max-Age", "1800");
                */
                context.render(data);
            });
        });
    } else {
        context.render500();
    }
}

var shasum = function(filePath, callback) {
    var sha = crypto.createHash('sha1');
	var s = fs.ReadStream(filePath);
	s.on('data', function(d) {
		sha.update(d);
	});
	s.on('end', function() {
		callback(null, sha.digest('hex'));
	});
	s.on('error', function(err) {
		callback(err);
	});
};

