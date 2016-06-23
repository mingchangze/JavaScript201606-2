/**
 * Created by xiao lei on 2016/6/15.
 */
var utils={
    getByClass:function(){

    },
    getChildren:function(curEle){
        var aChild=curEle.childNodes;
        var ary=[];
        for(var i=0; i<aChild.length; i++){
            var cur=aChild[i];
            if(cur.nodeType===1){
                ary.push(cur);
            }
        }
        return ary;
    }
};