

/*
 * 碰撞检测1.0
 */
function isCrash(obj1, obj2){
	if(obj1 && obj2){
		var leftSide = obj2.offsetLeft-obj1.offsetWidth/2;
		var rightSide = obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth/2;
		var upSide = obj2.offsetTop - obj1.offsetHeight/2;
		var downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight/2;
		var x = obj1.offsetLeft+obj1.offsetWidth/2;
		var y = obj1.offsetTop + obj1.offsetHeight/2;
		if(x > leftSide && x < rightSide && y > upSide && y < downSide){
			return true;
		} 
	}
	return false;
}


/*
 * 碰撞检测2.0
 */
function isCrash2(obj1, obj2) {
	var t1=obj1.offsetTop;
	var b1=obj1.offsetTop+obj1.offsetHeight;
	var l1=obj1.offsetLeft;
	var r1=obj1.offsetLeft+obj1.offsetWidth;

	var t2=obj2.offsetTop;
	var b2=obj2.offsetTop+obj2.offsetHeight;
	var l2=obj2.offsetLeft;
	var r2=obj2.offsetLeft+obj2.offsetWidth;
	if (t1>b2||b1<t2||r1<l2||l1>r2){
		return false;
	}else {
		return true;
	}
}











