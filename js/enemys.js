/**
 * Created by 小奇 on 2016/9/30.
 */
//敌机
function Enemy(type) {
    this.ele=document.createElement("div");
    this.hp=0;
    this.speed=0;
    this.dieImgs=[];
    this.srcoe=0;
    this.id=parseInt(Math.random()*100000);
    this.init=function () {
        switch(type) {
            //大型飞机
            case this.Enemy_Type_Large:
                this.ele.className = "enemy-large"; //css样式
                this.hp = this.Enemy_HP_Large; //血量
                this.speed = this.Enemy_Speed_Large; //速度
                this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
                this.srcoe = 30;
                break;
            //中型飞机
            case this.Enemy_Type_Middle:
                this.ele.className = "enemy-middle"; //css样式
                this.hp = this.Enemy_HP_Middle; //血量
                this.speed = this.Enemy_Speed_Middle; //速度
                this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
                this.srcoe = 20;
                break;
            //小型飞机
            case this.Enemy_Type_Small:
                this.ele.className = "enemy-small"; //css样式
                this.hp = this.Enemy_HP_Small; //血量
                this.speed = this.Enemy_Speed_Small; //速度
                this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
                this.srcoe = 10;
                break;
            }
            //添加到页面
        gameEngie.ele.appendChild(this.ele);
            //保存敌机到游戏引擎中
        gameEngie.enemys[this.id]=this;

        //设置位置
        var left=parseInt(Math.random()*(gameEngie.ele.offsetWidth-this.ele.offsetWidth));
        this.ele.style.left=left+"px";
        this.ele.style.top=-gameEngie.ele.offsetHeight+"px";

        return this;

    };

    //敌机移动
    this.move=function () {
        var self = this;
        //开启定时器, 让敌机向下移动
        this.timer = setInterval(function() {

            //如果敌机超出下边界, 则关闭定时器,且移除敌机
            if (self.ele.offsetTop > gameEngie.ele.offsetHeight) {
                clearInterval(self.timer); //关闭定时器
                gameEngie.ele.removeChild(self.ele); //移除敌机
                delete gameEngie.enemys[self.id]; //从gameEngine.enemys对象中移除当前敌机对象

            }
            else {
                //移动
                self.ele.style.top = self.ele.offsetTop + self.speed + "px";
            }
        },50);
    };

    //受到一点伤害
    this.hurt = function() {
        this.hp--; //掉一点血
        if (this.hp == 0) { //当血量为0时
            this.boom(); //爆炸
            //把分数添加
            gameEngie.srcoeNode.innerHTML = (gameEngie.srcoeNode.innerHTML-0) + this.srcoe;
            console.log("innerhtml:"+gameEngie.srcoeNode.innerHTML);
        }
    }

    //爆炸
    this.boom = function() {
        //关闭move中的定时器, 让敌机停止移动
        clearInterval(this.timer);

        //爆炸动画
        var self = this;
        var index = 0;
        var dieTimer = setInterval(function(){

            if (index >= self.dieImgs.length) {
                clearInterval(dieTimer); //关闭定时器
                gameEngie.ele.removeChild(self.ele); //移除敌机
                delete gameEngie.enemys[self.id]; //将当前的敌机对象从gameEngine.enemys对象中移除
            }
            else {
                self.ele.style.background = "url(" + self.dieImgs[index++] + ") no-repeat";
            }
        }, 50);

    }

}



Enemy.prototype={
    Enemy_Type_Large:1,
    Enemy_Type_Middle:2,
    Enemy_Type_Small:3,

    Enemy_HP_Large:8,
    Enemy_HP_Middle:4,
    Enemy_HP_Small:1,

    Enemy_Speed_Large:5,
    Enemy_Speed_Middle:10,
    Enemy_Speed_Small:15
};