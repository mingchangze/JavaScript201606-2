/**
 * Created by xiao lei on 2016/6/15.
 */
var header={
    tab:function(){
        alert(123)
    },
    changBg:function(){
        var oUl=document.getElementsByTagName('ul')[0];
        var aLi=utils.getChildren(oUl);
        for(var i=0; i<aLi.length; i++){
            aLi[i].style.background='red'
        }
        this.tab()

    }
};
header.changBg()