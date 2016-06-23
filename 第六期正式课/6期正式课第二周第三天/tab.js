/**
 * Created by xiao lei on 2016/6/22.
 */
//需求：实现隔行换色的表格排序
//1.获取并解析数据 2.绑定数据 3.隔行换色 4.表格排序
//获取数据
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;//获取tHead
    var tCells=tHead.rows[0].cells;//获取表头第一行下所有的列
    var tBody=oTab.tBodies[0];//获取第一个tBody
    var aRows=tBody.rows;//获取tBody下所有的行
    var data=null;
    //1.获取并解析数据
    getDate();
    function getDate(){
        //1.创建一个ajax对象
        var xml=new XMLHttpRequest();
        //2.打开地址
        xml.open('get','data.txt',false)
        //3.响应请求
        xml.onreadystatechange=function(){
            //1.是否准备好了 2.响应是否成功：成功 2xx；
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText)
            }
        };
        //4.发送请求
        xml.send(null);
    }
    //2.绑定数据 ： 把data数据跟页面HTML绑定在一起
    //思路1：字符串拼接
    bind();
    /*function bind(){
        var str='';
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            cur.sex=cur.sex===0?'男':'女';//关于性别是数字的处理；
            str+='<tr>\
                <td>'+cur.name+'</td>\
                <td>'+cur.age+'</td>\
                <td>'+cur.score+'</td>\
                <td>'+cur.sex+'</td>\
                </tr>'
        }
        tBody.innerHTML=str;
    }*/
    function bind(){
        //创建一个文档碎片
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            //通过for循环创建每一个tr;
            var oTr=document.createElement('tr');
            var cur=data[i];
            for(var key in cur){//每一个data[i]其实都是大对象，只有遍历每一个对象，根据遍历次数决定td的个数
                if(key==='sex'){//处理性别
                    cur[key]=cur[key]===0?'男':'女';
                }
                var oTd=document.createElement('td');
                oTd.innerHTML=cur[key];
                oTr.appendChild(oTd);
            }
           frg.appendChild(oTr);
        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeColor();
    function changeColor(){
        //思路1：switch；
        /*for(var i=0; i<aRows.length; i++){
            var cur=aRows[i];
            var bg=null;
            switch (i%3){
                case 0:
                    bg='bg0';
                    break;
                case 1:
                    bg='bg1';
                    break;
                default :
                    bg='bg2';
                    break;
            }
            cur.className=bg;
        }*/
        //思路2：
        for(var i=0; i<aRows.length; i++){
            aRows[i].className='bg'+i%3;
        }
    }
    //4.表格排序
    function sort(n){
        var _this=this;
        //点击哪一列的时候，让他*=-1；同时，让其他没点击的列恢复初始值；
        for(var i=0; i<tCells.length; i++){
            /*if(i===n){
                tCells[i].flag*=-1;
            }else{
                tCells[i].flag=-1;
            }*/
            tCells[i].flag=i===n?tCells[i].flag*-1:-1;
        }
        //_this.flag*=-1;//1 -1 1 -1......
        //1.类数组转数组
        var ary=utils.listToArray(aRows);
        //2.sort排序
        ary.sort(function(a,b){
            var curInner=a.cells[n].innerHTML;
            var nexInner=b.cells[n].innerHTML;
            var curNum=Number(a.cells[n].innerHTML);
            var nexNum=Number(b.cells[n].innerHTML);
            //如果当前项或下一项是非有效数字的时候，就按照汉字来排序 a.localeCompare(b)
            if(isNaN(curInner) || isNaN(nexInner)){
                return (curInner.localeCompare(nexInner))*_this.flag;
            }
            return (curNum-nexNum)*_this.flag;
        });
        //3.把排好序的数组重新插入页面
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg=null;
        changeColor();
    }
    for(var i=0; i<tCells.length; i++){
        //遍历头部的没一列，让className=='cursor'的有点击事件
        if(tCells[i].className==='cursor'){
            tCells[i].index=i;//自定义属性保存没一列对应的索引
            tCells[i].flag=-1;//自定义属性，给没一列上保存flag=-1;
            tCells[i].onclick=function(){
                sort.call(this,this.index)
            }
        }
    }
    /*tCells[1].flag=-1;
    tCells[1].onclick=function(){
        sort.call(this);
    }*/












