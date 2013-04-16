/*
* @description 创建类的类库
* @return {Object}
*/
var Class = function(){
    var klass = function(){
        this.init.apply(this, arguments);
    };
    
    if(parent){
        var subclass = function(){}
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass();
    };

    klass.prototype.init = function(){}

    //定义prototype的别名    
    klass.fn = klass.prototype;

    klass.fn.parent = klass;
    klass._super = klass.__proto__;

    //给类添加属性
    klass.extend = function(obj){
        var extended = obj.extended;
        for(var i in obj){
            klass[i] = obj[i];
        }
        if(extended){
            extended(klass);
        }
    };
    
    //给实例添加属性
    klass.include = function(obj){
        var included = obj.included;
        for(var i in obj){
            klass.fn[i] = obj[i];
        }
        if(included){
            included(klass);
        }
    };

    //添加一个proxy函数
    klass.proxy = function(func){
        var self =this;
        return (function(){
            func.apply(self, arguments);
        });
    };
    klass.fn.proxy = klass.proxy;
};


