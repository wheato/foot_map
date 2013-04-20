/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 13-4-18
 * Time: 下午10:17
 * To change this template use File | Settings | File Templates.
 */

var Foot = window.Foot || {};

//第三方APP配置
Foot.APPCONFIG = {
    'sina' : {
        appkey : '',
        appsecret : '',
        url: ''
    },

    'qq' : {
        'appkey' : '801337745',
        'appsecret': 'f7efa4221d6d68b7e47a3755028e35e8',
        'url':'https://open.t.qq.com/cgi-bin/oauth2/access_token?client_id={0}&client_secret={1}&redirect_uri=http://127.0.0.1/test.html&grant_type=authorization_code&code={2}'
    }
}


Foot.wbFactory = function(url, code){
    var name = url.indexOf('weibo') > -1 ? 'weibo' : 'qq';
    switch (name){
        case 'weibo' : return Foot.APPCONFIG['sina'].url.replace('{0}').replace().replace();
        case 'qq' : return Foot.APPCONFIG['qq'].url.replace('{0}', Foot.APPCONFIG['qq'].appkey).replace('{1}',Foot.APPCONFIG['qq'].appsecret).replace('{2}', code);
    }
};

//微博对象，用于获取code和token
Foot.Weibo = function(){
    this.requestUrl = '';
}

Foot.Weibo.prototype = {
    getToken : function(callback){
        var code, url;
        var getCode = function(){
            var querystring = window.location.search,
                queryHash = {},
                query;
            this.requestUrl = window.location.hostname;
            if(!querystring) {return null;}

            query = querystring.split('&');
            query[0] = query[0].replace('?', '');

            query.forEach(function(str){
                var temp = str.split('=');
                queryHash[temp[0]] = temp[1];
            });
            return queryHash['code'];
        }

        code = getCode();
        url = Foot.wbFactory(this.requestUrl, code);
        if(!code || !url){
            return callback('Arguments error!');
        }
        console.log(code);
        console.log(url);
        $.ajax({
            url:url
        }).done(function(data){
                console.log(data);
                data = JSON.parse(data);
                return data;
            });
    },

    getTimeline : function(obj,callback){
        $.ajax({
            url : 'http://127.0.0.1:8080/timeline',
            data: obj
        });
    }
}
