/**
 * Created by xiao lei on 2016/6/23.
 */
//需求：隔行换色的表格排序
//步骤：1.获取并解析数据 2.页面绑定数据 3.隔行换色 4.表格排序 5.在已经封装好的基础上优化处理；
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;
    var tCells=tHead.rows[0].cells;
    var tBody=oTab.tBodies[0];
    var aRows=tBody.rows;
    var data=null;
    //1.获取并解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest;
        xml.open('get','data.txt',false);
        xml.onreadystatechange=function(){
            //1.是否准备好 readyState===4; 2.响应的状态码 2xx;
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText);
            }
        };
        xml.send()
    }
    //2.页面绑定数据
    bind();
    //思路1：字符串拼接方式绑定数据
    /*function bind(){
        var str='';
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            cur.sex=cur.sex===0?'男':'女';
            str+='<tr>\
                <td>'+cur.name+'</td>\
                <td>'+cur.age+'</td>\
                <td>'+cur.score+'</td>\
                <td>'+cur.sex+'</td>\
                </tr>';
        }
        tBody.innerHTML+=str;
    }*/
    //思路2：动态创建方式绑定数据
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            var oTr=document.createElement('tr');
            for(var attr in cur){
                if(attr==='sex'){
                    cur[attr]=cur[attr]===0?'男':'女';
                }
                var oTd=document.createElement('td');
                oTd.innerHTML=cur[attr];
                oTr.appendChild(oTd);
            }
            frg.appendChild(oTr)

        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeColor();
    function changeColor(){
        for(var i=0; i<aRows.length; i++){
            /*var bg=null;
            if(i%3===0){
                bg='bg0';
            }else if(i%3===1){
                bg='bg1';
            }else{
                bg='bg2';
            }
            aRows[i].className=bg;*/
            aRows[i].className='bg'+i%3;
        }
    }
    //4.表格排序
    function sort(n){
        var _this=this;
        //点击哪一列的时候，让哪一列*=-1；其他没发生点击事件的列都恢复初始状态-1；
        for(var i=0; i<tCells.length; i++){
            /*if(i===n){//说明是你发生点击的这一列
                tCells[i].flag*=-1;
            }else{//其他列：没发生点击事件
                tCells[i].flag=-1;
            }*/
            tCells[i].flag=i===n?tCells[i].flag*-1:-1;
        }
        //1, -1; 1; -1......
        //1.类数组转数组
        var ary=utils.listToArray(aRows);
        //2.sort排序
        ary.sort(function(a,b){
            var curInner=a.cells[n].innerHTML;
            var nexInner=b.cells[n].innerHTML;
            var curNum=parseFloat(a.cells[n].innerHTML);
            var NexNum=parseFloat(b.cells[n].innerHTML);
            if(isNaN(curInner) || isNaN(nexInner)){
                return curInner.localeCompare(nexInner)*_this.flag
            }
            return (curNum-NexNum)*_this.flag// 1 -1 1 -1.......
        });
        //3.把排好序的数据内容重新插入页面
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg=null;
        changeColor();
    }
    for(var i=0; i<tCells.length; i++){
        if(tCells[i].className==='cursor'){
            tCells[i].flag=-1;
            //思路1：自定义属性
            /*tCells[i].index=i;
             tCells[i].onclick=function(){
             sort.call(this,this.index);
             }*/
            //思路2：闭包
            (function(index){
                tCells[index].onclick=function(){
                    sort.call(this,index)
                }
            })(i)
        }
    }
    /*tCells[1].flag=-1;//1 -1;
    tCells[1].onclick=function(){
        sort.call(this);
    }*/

