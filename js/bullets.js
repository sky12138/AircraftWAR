/**
 * Created by 小奇 on 2016/9/30.
 */
//子弹（构造函数）
function Bullet() {
    this.ele=null;
    this.id=parseInt(Math.random()*100000);
    this.init=function () {
        this.ele=document.createElement("div");
        this.ele.className="bullet";

        gameEngie.ele.appendChild(this.ele);
        //把子弹添加到bullts这个对象中
        gameEngie.bullets[this.id]=this;

        //设置位置
        this.ele.style.left=myPlane.ele.offsetWidth/2+myPlane.ele.offsetLeft-this.ele.offsetWidth/2+"px";
        this.ele.style.top=myPlane.ele.offsetTop-5+"px";

        return this;


    };
    //子弹向上移动
    this.mov=function () {
        var self=this;
        self.timer=setInterval(function () {
            if(self.ele.offsetTop<-10){
                clearInterval(self.timer);
                gameEngie.ele.removeChild(self.ele);
                delete gameEngie.bullets[self.id];
            }else {
                self.ele.style.top=self.ele.offsetTop-10+"px";
            }
        },30)
    };
    //子弹爆炸
    this.boom=function () {
        clearInterval(this.timer);
        var dieImgs = ["images/die1.png", "images/die2.png"];
        var index=0;
        var self=this;
        var dieTimer=setInterval(function () {
            if(index>2){
                clearInterval(dieTimer);
            }else {
                self.ele.style.background = "url("+ dieImgs[index] +") no-repeat";
                index++;
            }
        },50)
    }

}