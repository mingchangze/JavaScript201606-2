/**
 * Created by xiao lei on 2016/6/21.
 */
    //utils这个库：主要提供一些公有的工具方法；
var utils={
    /**
     * listToArray:类数组转数组
     * @param arg(类数组)
     * @returns {Array}
     */
    listToArray:function listToArray(arg){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg)
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    jsonParse:function jsonParse(str){
        //当‘JSON’这个属性在window对象上的时候，就用JSON.parse()这个方法；否则，就用eval,eval记得一定要拼接括号
        return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    }
}