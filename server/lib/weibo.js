var https = require('https');

var wb_config = {
    'sina' : {
        appkey : '',
        appsecret : '',
        url: ''
    },

    'qq' : {
        appkey : '801337745',
        appsecret: 'f7efa4221d6d68b7e47a3755028e35e8',
        query: '?client_id={0}&client_secret={1}&redirect_uri=http://127.0.0.1&grant_type=authorization_code&code={2}'
    }
};

exports.reqToken = function(query_args, callback){
    var query = [],
        querystring = [];
    query_args.appkey = wb_config['qq'].appkey;
    query_args.appsecret = wb_config['qq'].appsecret;
    var option = {
        hostname: 'open.t.qq.com',
        path:'/cgi-bin/oauth2/access_token',
        query: wb_config['qq'].query.replace('{0}', query_args.appkey).replace('{1}', query_args.appsecret).replace('{2}', query_args.code),
        method : 'get',
        port: 443,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    var url = 'https://' + option.hostname+option.path+option.query;
    https.get(url, function(res){
        var res_obj = '';
        res.on('data', function(chunck) {
            process.stdout.write(chunck);
            res_obj += chunck;
        });
        res.on('end', function(){
            console.log('res_obj');
            callback(res_obj);
        });
        res.on('error', function(e) {
            console.error(e);
        });
    });
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

    https.request(options, function(req, res){
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
