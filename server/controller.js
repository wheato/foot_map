var weibo = require('./lib/weibo'),
    querystring = require('querystring'),
    url = require('url');

exports.index = function(){

}

exports.reqCode = function(){

}

exports.getWeibo = function(){
    var req = this.req;
    var postData = '';
    var context = this;
    if(req.method === 'POST'){
        req.addListener('data', function(chunck){
            postData += chunck;
        });
        req.addListener('end', function(){
            postData = JSON.parse(postData);
            this.token = postData['token'];

            weibo.getTimelineAll(this.token, function(obj){
                context.render(obj);
            });
        });
    } else {
        context.render500();
    }
}

