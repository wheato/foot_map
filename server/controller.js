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
            if(postData.method === 'topic'){
                weibo.getBytopic(postData, function(data){
                    context.render(data);
                });
            }
            weibo.getTimelineAll(postData, function(data){
                context.render(data);
            });
        });
    } else {
        context.render500();
    }
}



