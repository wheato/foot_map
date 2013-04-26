/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 13-4-20
 * Time: 下午7:16
 * To change this template use File | Settings | File Templates.
 */

App.Collections = {};

App.Collections.Timeline = Backbone.Collection.extend({
    model: App.Model.Weibo
});

