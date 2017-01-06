/**
 * Created by 小奇 on 2016/9/30.
 */
//游戏引擎
var gameEngie={
    ele:null,//游戏区域
    bullets:{},//游戏区域所有子弹
    enemys:{},//游戏区域所有敌机
    isCrashMyPlane:false,//是否碰撞
    srcoeNode:null,//分数

    init:function () {
        this.ele=document.getElementById("main_menu");
        return this;
    },

    //开始游戏
    start:function () {
            gameEngie.loading(function(){
                //现在已经加载游戏完毕
                //现在可以正式游戏了
                console.log("开始正式游戏");

                //1, 显示我的飞机, 并发射子弹
                myPlane.init().fire();

                //2, 开启键盘监听
                gameEngie.keyListening();

                //3, 创建敌机
                gameEngie.createEnemy();

                //4, 碰撞检测
                gameEngie.crashListening();

                //5, 显示分数
                gameEngie.showScore();

                //6, 让背景图移动
                gameEngie.move();
            })
        },

    //游戏加载
    loading: function (loadCallBack){
        //游戏logo
        var logo=document.createElement("div");
        logo.className="logo";
        gameEngie.ele.appendChild(logo);
        //加载动画
        var load=document.createElement("div");
        load.className="loading";
        gameEngie.ele.appendChild(load);
        //开始加载动画
        var index = 0;
        var loadImgs = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
        var timer = setInterval(function(){
            //当运动到index==5时, 则游戏加载结束
            if (index >= 2) {
                clearInterval(timer); //关闭定时器
                //移除图片(logo,load)
                gameEngie.ele.removeChild(logo);
                gameEngie.ele.removeChild(load);

                //回调
                loadCallBack();
            }
            else {
                //切换图片
                index++;
                load.style.background = "url(" + loadImgs[index%3] + ") no-repeat";
            }
        }, 500);
    },


    //开启键盘监听
    keyListening: function(){
        var speed = 0; //速度
        var speed2= 0; //速度
        //监听键盘
        window.onkeydown = function(evt){
            var oEvent = evt || event;
            var keycode = oEvent.keyCode; //键码
            //向左
            if (keycode == 37) {
                speed = -10;
            }
            //向右
            else if (keycode == 39){
                speed = 10;
            }
            //向上
            else if (keycode == 38){
                speed2= -5;
            }
            //向下
            else if (keycode == 40){
                speed2 = +5;
            }
        };
        //松开按键
        window.onkeyup = function() {
            speed = 0;
            speed2= 0;
        };
        //通过速度speed来匀速移动飞机
        setInterval(function(){
            var x = myPlane.ele.offsetLeft+speed;
            var y = myPlane.ele.offsetTop+speed2;
            if (x < 0) { //如果超出左边界, 则最多在左边界的位置
                x = 0;
            }
            //如果超出右边界, 则最多在右边界的位置
            else if (x > gameEngie.ele.offsetWidth-myPlane.ele.offsetWidth) {
                x = gameEngie.ele.offsetWidth-myPlane.ele.offsetWidth;
            }
            else if (y < 0) { //如果超出上边界, 则最多在下边界的位置
                y = 0;
            }
            //如果超出下边界, 则最多在上边界的位置
            else if (y > gameEngie.ele.offsetHeight-myPlane.ele.offsetHeight) {
                y = gameEngie.ele.offsetHeight-myPlane.ele.offsetHeight;
            }
            myPlane.ele.style.left = x + "px";
            myPlane.ele.style.top = y + "px";
        }, 30);
    },

    //创建敌机
    createEnemy: function() {

        //随机创建大型敌机
        setInterval(createBig, 6000);
        function createBig() {
            var flag = Math.random() > 0.7 ? true : false; //30%的几率创建敌机
            if (flag) {
                var bigEnemy = new Enemy(Enemy.prototype.Enemy_Type_Large); //创建大型敌机对象
                bigEnemy.init().move(); //初始化,并开始向下移动
            }
        }

        //随机创建中型飞机
        setInterval(createMiddle, 2000);
        function createMiddle() {
            var flag = Math.random() > 0.6 ? true : false; //40%的几率创建敌机
            if (flag) {
                var middleEnemy = new Enemy(Enemy.prototype.Enemy_Type_Middle); //创建中型敌机对象
                middleEnemy.init().move(); //初始化,并开始向下移动
            }
        }

        //随机创建小型飞机
        setInterval(createSmall, 500);
        function createSmall() {
            var flag = Math.random() > 0.5 ? true : false; //50%的几率创建敌机
            if (flag) {
                var smallEnemy = new Enemy(Enemy.prototype.Enemy_Type_Small); //创建小型敌机对象
                smallEnemy.init().move(); //初始化,并开始向下移动
            }
        }
    },

    //碰撞检测
    crashListening: function() {
        //开启定时器, 每隔30毫秒检测是否有碰撞
        setInterval(function(){

            //遍历所有敌机对象和所有子弹对象, 判断每两个之间是否有碰撞(是否有交集)
            for (var i in gameEngie.enemys) { //遍历所有敌机

                for (var j in gameEngie.bullets) { //遍历所有子弹

                    //如果有碰撞
                    if (isCrash(gameEngie.enemys[i].ele, gameEngie.bullets[j].ele)) {
                        //让子弹爆炸, 并从gameEngine.bullets移除该子弹
                        gameEngie.bullets[j].boom();
                        delete gameEngie.bullets[j];
                        //让敌机受到一点伤害
                        gameEngie.enemys[i].hurt();
                    }
                }

                //检测我的飞机是否和敌机碰撞
                if (!self.isCrashMyPlane && isCrash(gameEngie.enemys[i].ele, myPlane.ele)) {
                    self.isCrashMyPlane = true; //将isCrashMyPlane改变成true

                    //让我的飞机爆炸
                    myPlane.boom(function(){
                        alert("Game Over!");
                        location.reload();
                    });
                }

            }

        }, 30);
    },

    //显示分数
    showScore: function() {
        this.srcoeNode = document.getElementById("scroeNode");
        this.srcoeNode.innerHTML = 0;
    },

    //让背景图移动
    move: function() {
        var y = 0;
        setInterval(function(){
            gameEngie.ele.style.backgroundPositionY = y++ + "px";
        }, 30);

    }

}

