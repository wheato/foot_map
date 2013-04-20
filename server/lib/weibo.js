var http = require('http');

var wb_config = {

};

/*
 * return {JSON} 
 */
exports.getWeiboAll = function(wb, data, callback){
    var querytring = [],
        reqUrl = wb_config[wb].getTimeline;
    var resData = '',
        options = {};


    for(item in data){
        item = item + '=' + data[item];
        querytring.push(item);
    }
    querytring = '?' + querytring.join('&');
    reqUrl += querytring;

    options = {
        url : reqUrl,
        method:'get'
    };

    http.request(options, function(req, res){
        res.on('data', function(chunk){
            resData += chunk;
        });
        res.on('end', function(){
            resData = JSON.parse(resData);
            callback(resData);
        });
        res.on('err', function(){
            callback(null);
        });
    });
}

exports.getByTopic = function(){};
