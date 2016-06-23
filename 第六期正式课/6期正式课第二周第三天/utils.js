/**
 * Created by xiao lei on 2016/6/22.
 */
var utils={
    //listToArray:类数组转数组；
    listToArray:function listToArray(arg){
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
        }
        return ary;
    },
    jsonParse:function jsonParse(str){
        return 'JSON' in window?JSON.parse(str):eval('('+str+')')
    }
}