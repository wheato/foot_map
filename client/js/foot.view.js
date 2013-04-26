/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 13-4-20
 * Time: 下午7:16
 * To change this template use File | Settings | File Templates.
 */

App.View = {};

App.View.index = Backbone.View.extend({
    el:'body',

    render: function(){
        var doc = '<div id="wrap"><div class="login-box">' +
            '<h1>麦足迹</h1><p>欢迎使用麦足迹，您可以通过麦足迹选取您的微博，生成您的微博足迹！</p>' +
            '<div class="login-btns"><a class="login-sina" href="#!/status"><span>新浪微博</span></a> '+
            '<a class="login-tt" href="http://open.t.qq.com/cgi-bin/oauth2/authorize?client_id=801337745&response_type=code&redirect_uri=http://127.0.0.1&checkStatus=yes&appfrom=&g_tk=&sessionKey=e6a537e2dae94798b5cac9b3e391ec7d&checkType=showAuth&state=!/status"><span>腾讯微博</span></a> </div> </div> <footer class="fixed-bottom">' +
            '<p>Copyright &copy; 2013 Developed by wheato</p></footer></div>';
        $('html').addClass('index');
        $(this.el).addClass('index');
        return $(this.el).html(doc);
    }
});

App.View.status = Backbone.View.extend({
    el:'body',

    render: function(status){
        var status_bar,footer,
            doc = '<div id="wrap"></div>';
        if(status){
            status_bar = '<div class="auth-status"><div class="auth-ok"><p class="auth-tips">授权成功</p>'+
                         '<p><a class="next-link" href="#">创建我的微博足迹</a></p></div></div>'
        } else{
            status_bar = '<div class="auth-status"><div class="auth-no"><p class="auth-tips">授权失败</p>' +
                         '<p><a class="next-link" href="">返回重新授权</a></p></div></div>'
        }

        footer = '<footer class="fixed-bottom"><p>Copyright &copy; 2013 Developed by wheato</p></footer>';

        doc = $(doc).html(status_bar + footer);
        $('html').addClass('index');
        $(this.el).addClass('index');
        return $(this.el).html(doc);
    }
});