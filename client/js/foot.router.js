/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 13-4-21
 * Time: 上午12:34
 * To change this template use File | Settings | File Templates.
 */

var WbApi = new Foot.Weibo;

App.router = Backbone.Router.extend({
    routes: {
        "": "index",
        "!/status?*": "status",
        "!/timeline": "getTimeline",
        "!/selected": "selected",
        "!/maps": "showMap"
    },

    //collection_timeline : new Backbone.Collections.Timeline,


    index : function(){
        var view_index = new App.View.index;
        var querystring = window.location.search;
        if(querystring){
            var state, query;
            query = Foot.queryParse(querystring);
            state = query['state'];
            if(state){
                this.navigate(state, {trigger:true});
            }
        } else{
            view_index.render();
        }
    },

    status: function(){
        var queryObj, status = false;
        var view_tatus = new App.View.status(status),
            model_queryArgs = new App.Model.QueryArgs;

        WbApi.getToken(function(err, data){
            if (err){
                status = false;
            } else {
                status = true;
                //TODO: show oauth success page;
                console.log(data);
            }
            view_tatus.render(status);
        });

    },

    getTimeline: function(){

    }
});