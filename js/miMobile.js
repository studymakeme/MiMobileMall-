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

/*轮播图*/
var Mslider = document.getElementById("Mslider");
var ma = Mslider.children[0].children;
var mcont = Mslider.children[1];
var mbtn = mcont.children[0].children;
var molis = mcont.children[1].children;
var data = 0;


console.log(ma);
for(var i=0;i<molis.length;i++){
	molis[i].index = i;
	molis[i].onmouseover = function(){
		this.className = "con";		
	}
	molis[i].onclick = function () {
		for(var j=0;j<molis.length;j++){
			ma[j].className ="";
		}
		ma[this.index].className = "con";
		data = this.index;
	}
}
molis[0].parentNode.onmouseout = function () {
	for(var j=0;j<molis.length;j++){
		molis[j].className ="";
	}	
	molis[data].className = "con";

}
console.log(mbtn[0]);
mbtn[1].onclick = mbtntoget;
mbtn[0].onclick = mbtntoget;

function mbtntoget(){
	if(data == 0){
		molis[data].className = "";
		ma[data].className="";
		data = 1;
		molis[data].className = "con";
	}else if(data ==1){
		molis[data].className = "";
		ma[data].className="";
		data =0;
		ma[data].className="con";
		molis[data].className = "con";
	}
}

/*影阴*/
var bigtu = document.getElementById("bigtu");
var yying = bigtu.getElementsByClassName("yying");
var yymobl = bigtu.getElementsByClassName("mobl");
console.log(yymobl);

yinying(yymobl,"mobl","mobl ycon");
yinying(yying,"yying clearfix","yying clearfix ycon");
function yinying(yobj,classname,con){
	for(var i = 0; i<yobj.length;i++){
		yobj[i].index = i;
		yobj[i].onmouseover = function () {
			for(var j = 0; j < yobj.length; j++) {
				yobj[j].className = classname;
				animate(yobj[j],{"top":0});
			}	
			this.className = con;
			animate(this,{"top":-2});
		}
		yobj[i].onmouseout = function () {
			this.className = classname;
			animate(this,{"top":0});
		}
	}
	
}

