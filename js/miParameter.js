function $(str) {
	var s = str.substr(0, 1); // # . 
	var ss = str.substr(1); //#con ==> con
	switch(s) {
		case "#":
			return document.getElementById(ss);
			break;
		case ".":
			return getClass(ss);
			break;
		default:
			return document.getElementsByTagName(str);
	}
}
function getClass(classname) {
	// 如果有方法名,是兼容ie6,7,8
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(classname);
	}
	var con = document.getElementsByTagName("*"); //获取所有标签
	var arr = []; //存放所有满足条件数组
	// 循环所有标签
	for(var i = 0; i < con.length; i++) {
		var spl = con[i].className.split(" "); //数组
		// 字符串切割后的数组
		for(var j = 0; j < spl.length; j++) {
			if(spl[j] == classname) {
				arr.push(con[i]);
			}
		}
	}
	return arr;
}

// 缓动效果
function animate(obj, json, callback) {
	clearInterval(obj.timer); //首次清除定时器

	obj.timer = setInterval(function() {

		var flag = true // 用来判断是否停止定时器
		for(attr in json) {
			var current = 0;
			if(attr == "opacity") {
				current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0; //0.3 == 30
			} else {
				current = parseInt(getStyle(obj, attr)); //属性值
			}

			var step = (json[attr] - current) / 10; //步长

			step = step > 0 ? Math.ceil(step) : Math.floor(step);

			// 判断透明度
			if(attr == "opacity") {
				if("opacity" in obj.style) { //浏览器兼容问题
					obj.style.opacity = (current + step) / 100; //0-1 0.3
				} else {
					obj.style.filter = "alpha(opacity:" + (current + step) + ")";
				}
			} else if(attr == "zIndex") {
				obj.style.zIndex = json[attr];
			} else {
				obj.style[attr] = current + step + "px";
			}

			// 目标的距离 != 对象距离
			if(json[attr] != current) { //只要其中一个不满足条件,不停止定时器
				flag = false;
			}
		}
		// 清除定时器
		if(flag) {
			clearInterval(obj.timer);

			// alert("运动结束！！！");
			if(callback) {
				callback(); //回调函数  运行函数
			}
		}

	}, 20)
}

// 样式兼容写法
function getStyle(obj, attr) {
	if(obj.currentStyle) { //判断ie
		return obj.currentStyle[attr]; //返回兼容ie写法
	} else {
		return window.getComputedStyle(obj, null)[attr]; // w3c 浏览器
	}
}


//滚动
var par2 = document.getElementById("par2");
var cans = document.getElementById("cans");
var crimg = cans.children[0].children[0];
var xqHeight = cans.getElementsByClassName("c-xq")[0].offsetHeight;

var canstop = cans.offsetTop;

console.log(crimg);
window.onscroll = function(){
	if(scroll().top>=205){
		animate(par2,{"top":0});
	}else{
		animate(par2,{"top":-67});
	}
	
	if(scroll().top >= canstop){
		crimg.style.top = scroll().top - canstop + par2.offsetHeight+"px";
	}
	if(scroll().top >= xqHeight- crimg.offsetHeight+canstop ){
		crimg.style.top = xqHeight- crimg.offsetHeight  -par2.offsetHeight+"px";
	}
}


