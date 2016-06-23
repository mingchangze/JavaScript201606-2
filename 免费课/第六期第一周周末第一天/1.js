/**
 * Created by xiao lei on 2016/6/4.
 */
window.onload=function(){
    //实现思路：鼠标移入div1,然div2显示，移出，隐藏
    //当鼠标移入div1元素的时候，想干什么事？
    var oDiv1=document.getElementById('div1');
    console.log(oDiv1)
    var oDiv2=document.getElementById('div2');
    oDiv1["onmouseover"]=function(){
        //这里放的东西：就是我们想干的事情；
        oDiv2.style.display='block';
    };
    oDiv1["onmouseout"]=function(){
        oDiv2["style"]["display"]='none';
    };
}