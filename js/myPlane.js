/**
 * Created by 小奇 on 2016/9/30.
 */
//我方飞机
var myPlane={
    ele:null,
    fireInterval:80,//子弹发射频率

    init:function () {
        //创建我方飞机
        this.ele=document.createElement("div");
        this.ele.className="myplane";
        //添加到游戏区
        gameEngie.ele.appendChild(this.ele);
        //初始位置
        this.ele.style.left=(gameEngie.ele.offsetWidth-this.ele.offsetWidth)/2+"px";
        this.ele.style.top=gameEngie.ele.offsetHeight-this.ele.offsetHeight+"px";
        this.startDrag();//拖拽飞机
        return this;
    },
    //发射子弹
    fire:function () {
        this.timer=setInterval(function () {
            //创建子弹
            var bullet= new Bullet();
            bullet.init().mov();



        },this.fireInterval)
    },

    //我方飞机拖拽
    startDrag:function () {
        var self=this;
        self.ele.onmousedown=function (evt) {
            var oEvent=evt||event;
            var divX=oEvent.offsetX;
            var divY=oEvent.offsetY;

            document.onmousemove=function (evt) {
                var oEvent=evt||event;
                if (parseInt(self.ele.style.left) <=0) { //如果超出左边界, 则最多在左边界的位置
                    self.ele.style.left = 0;
                }
                //如果超出右边界, 则最多显示在右边界的位置
                else if (parseInt(self.ele.style.left) >= gameEngie.ele.offsetWidth - myPlane.ele.offsetWidth) {
                    self.ele.style.left = gameEngie.ele.offsetWidth - myPlane.ele.offsetWidth+"px";
                }
                self.ele.style.left=oEvent.clientX-gameEngie.ele.offsetLeft-divX+"px";
                self.ele.style.top=oEvent.clientY-divY+"px";
            };
            document.onmouseup=function () {
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    },
    //飞机爆炸
    boom:function (fn) {
        clearInterval(this.timer);
        var dieImgs = ["images/me_die1.png", "images/me_die2.png", "images/me_die3.png", "images/me_die4.png"]
        var index = 0;

        var dieTimer = setInterval(function(){

            if (index >= dieImgs.length) {
                clearInterval(dieTimer); //关闭定时器
                fn();//回调函数
                gameEngine.ele.removeChild(myPlane.ele); //移除我的飞机
            }
            else  {
                myPlane.ele.style.background = "url(" + dieImgs[index++] + ") no-repeat";
            }
        }, 50);
    }
};