/**
 * Created by xiao lei on 2016/6/23.
 */
//单例模式封装
var utils={
    //listToArray：类数组转数组
    listToArray:function listToArray(arg){
        var ary=[];
        try{//兼容浏览器
            ary=Array.prototype.slice.call(arg)
        }catch(e){//e:错误的原因
            //当浏览器不兼容时，我们做的兼容处理；
            for(var i=0; i<arg.length; i++){
                ary[ary.length]=arg[i];
            }
        }return ary;

    },
    //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象)
    jsonParse:function(jsonStr){
        /*var obj={};
        if('JSON' in window){//高级浏览器支持
            obj=JSON.parse(jsonStr);
        }else{//处理低级浏览器的兼容
            obj=eval('('+jsonStr+')')
        }
        return obj;*/
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
}