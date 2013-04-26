/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 13-4-20
 * Time: 下午7:13
 * To change this template use File | Settings | File Templates.
 */

var App = App || {};
App.Model = {};
/*
 * weibo一共有以下几个字段:username, pub_time, geo,latitude, longitude,
 *                     text, image, avatar, select
 *
 */


App.Model.Weibo = Backbone.Model.extend({
    defaults: {
        image: 'img/default.jpg',
        avatar: 'img/avatar.jpg'
    }
});

/*
 * 用于请求API的一些参数
 */
App.Model.QueryArgs = Backbone.Model.extend({
    defaults: {
        appkey: {
            'sina':Foot.APPCONFIG['sina'].appkey,
            'qq':Foot.APPCONFIG['sina'].appkey
        },

        appsecret: {
            'sina':Foot.APPCONFIG['sina'].appsecret,
            'qq':Foot.APPCONFIG['sina'].appsecret
        }
    }
});

App.Model.User = new Backbone.Model;
