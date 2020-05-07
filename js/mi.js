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
// 解决滚动条兼容性
function scroll() {
	if(window.pageYOffset != null) {
		return {
			top: window.pageYOffset,
			left: window.pageXOffset
		};
	}
	if(document.compatMode == "CSS1Compat") {
		return {
			top: document.documentElement.scrollTop,
			left: document.documentElement.scrollLeft
		}
	}
	return {
		top: document.body.scrollTop,
		left: document.body.scrollLeft
	}
}

// 解决client宽高兼容
function client() {
	//ie9+ 最新浏览器兼容
	if(window.innerHeight != null) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	if(document.compatMode === "CSS1Compat") { //标准浏览器兼容
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		}
	}
	// 怪异浏览器
	return {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	}

}

// 解决拖动选中文字方案
function removeAllRange() {
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}

// 封装两个隐藏与显示方法

function show(obj) {
	obj.style.display = "block";
}

function hide(obj) {
	obj.style.display = "none";
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

//分类
var cateli = document.getElementById("cateul").getElementsByTagName("li");
var item = document.getElementsByClassName("item");
/*console.log(cateli);
console.log(item);*/

for(var i = 0; i < cateli.length; i++) {
	cateli[i].index = i;
	cateli[i].onmouseover = function() {
		for(var j = 0; j < cateli.length; j++) {
			cateli[j].className = "";
			item[j].style.display = "none";
		}
		item[this.index].style.display = "block";
	}

	cateli[i].onmouseout = function() {
		item[this.index].style.display = "none";
	}

	item[i].index = i;
	item[i].onmouseover = function() {
		for(var j = 0; j < item.length; j++) {
			item[j].style.display = "none";
		}
		this.style.display = "block";
	}
	item[i].onmouseout = function() {
		item[this.index].style.display = "none";
	}
}

//分类end

//家电

var jda = document.getElementById("jdh01").getElementsByTagName("a");
var jdul = document.getElementById("jdr01").getElementsByTagName("ul");
var jdli = jdul[0].children;
//console.log(jdli);
//console.log(jda);
//console.log(jdul);
for(var i = 0; i < jda.length; i++) {
	jda[i].index = i;
	jda[i].onmouseover = function() {
		for(var j = 0; j < jda.length; j++) {
			jda[j].className = "";
			jdul[j].className = "";
		}
		this.className = "con";
		jdul[this.index].classList = "jdrcon";
		
		var jdli = jdul[this.index].children;
		jdyinying(jdli);
	}
}
jdyinying(jdli);
function jdyinying(jdli){
	for(var i = 0; i < jdli.length; i++) {
		jdli[i].index = i;
		jdli[i].onmouseover = function() {
			for(var j = 0; j < jdli.length; j++) {
				jdli[j].className = "fl jd-left";
				animate(jdli[j],{"left":0,"top":0});
			}
			this.className = "fl jd-left con";
			animate(this,{"left":-1,"top":-2});
		}
		jdli[i].onmouseout = function () {
			this.className = "fl jd-left";
			animate(this,{"left":0,"top":0});
		}
	}
}
//家电end

//  ========== 
//  = 下拉列表 = 
//  ========== 
var headerNav = document.getElementById("header-nav");
var headerNavlis = headerNav.children[0].children;
var xiala = document.getElementById("xiala");
var xldown = xiala.children[0];
var xlul=xiala.children[0].children[0].children;
//console.log(xlul);
for(var i = 0; i < headerNavlis.length - 2; i++) {
	headerNavlis[i].index = i;
	headerNavlis[i].onmouseover = function() {
		for(var j=0;j<headerNavlis.length - 2;j++){
			xlul[j].style.display="none";
		}
		xlul[this.index].style.display="block";
		xldown.style.display="block"
		animate(xldown,{"top":140});
		
	}
	headerNavlis[i].onmouseout = function() {
		xldown.style.display="none"
		animate(xldown,{"top":-90});
	}
	xldown.onmouseover = function() {
		xldown.style.display="block"
		animate(xldown,{"top":140});
	}
	xldown.onmouseout = function() {
		xldown.style.display="none"
		animate(xldown,{"top":-90});
	}
}
////  ========== 
////  = 搜索下拉框 = 
////  ========== 
//var search = document.getElementById("search");
//var serinp = search.children[0];
//var serbtn = search.children[1];
//var serwords = search.children[2];
//var serlist = search.children[3];
//var serclik = true;
//
//serinp.onclick = function() {
//	serlist.style.display = "block";
//	serwords.style.display = "none";
//	serinp.style.borderColor = "#FF6700";
//	serbtn.style.borderColor = "#FF6700"
//	serbtn.style.borderLeftColor = "";
//	serclik = false;
//}
//serinp.onmouseover = function() {
//	if(serclik) {
//		serinp.style.borderColor = "#B0B0B0";
//		serbtn.style.borderColor = "#B0B0B0"
//		serbtn.style.borderLeftColor = "";
//	}
//}
//document.onmousedown = function(event) {
//	var event = event || window.event;
//	var targetId = event.target ? event.target.id : event.srcElement.id;
//	if(targetId != search) {
//		serlist.style.display = "none";
//		serwords.style.display = "block";
//		serinp.style.borderColor = "#E0E0E0";
//		serbtn.style.borderColor = "#E0E0E0"
//		serbtn.style.borderLeftColor = "";
//	}
//	serclik = true;
//}
//serinp.onmouseout = function() {
//	if(serclik) {
//		serinp.style.borderColor = "#E0E0E0";
//		serbtn.style.borderColor = "#E0E0E0"
//		serbtn.style.borderLeftColor = "";
//	}
//}

//  ========== 
//  = 轮播图 = 
//  ==========
var slide = document.getElementById("slide");		
var deul = slide.children[0];//ul
var deulis = slide.children[0].children;//ul的li
var btn = slide.children[1];//btn
var deol = slide.children[2];//ol
var deolis = slide.children[2].children;//ol的li

deul.appendChild(deulis[0].cloneNode(true));
deul.insertBefore(deulis[3].cloneNode(true),deul.children[0])			

deul.style.width = deulis[0].offsetWidth * deulis.length+"px";
//console.log(deulis[0].offsetWidth);
deul.style.left = "-1226px";

for(var i = 0;i<deolis.length;i++){
	deolis[i].index=i;
	deolis[i].onmouseover = function(){
		for(var j=0;j<deolis.length;j++){
			deolis[j].className="";
		}
		this.className="con";
//		function animate(obj, json, callback)
		animate(deul,{"left":(-this.index-1)*deulis[0].offsetWidth});
		key = this.index+1
		spe = this.index;
		clearInterval(cleartime);
	}
	deolis.onmouseout = function () {
		cleartime = setInterval(tiemr,3000);
	}
}

var key = 1;	
var spe = 0;
btn.children[1].onclick = function(){
	clearInterval(cleartime);
	tiemr();
	cleartime = setInterval(tiemr,3000);
}
cleartime = setInterval(tiemr,3000);
function tiemr(){
	// 向右移动
	key++;//轮播图位置
	
	if(key > deulis.length - 1){
		deul.style.left = "-1226px"; //瞬间切换第一张图片位置
		key = 2;  //接着移动到第二种图片
	}
	
	animate(deul, {"left":-key *deulis[0].offsetWidth});//调用动画效果
	
	spe++;
	if(spe > deolis.length - 1){
		spe = 0; //小圆点正常切换
	}
	
	for(var i = 0; i < deolis.length;i++){
		deolis[i].className = "";
	}
	deolis[spe].className = "con";
}

btn.children[0].onclick = function(){
	clearInterval(cleartime);
	tiemrr();
	cleartime = setInterval(tiemr,3000);
}
function tiemrr(){
	// 向左移动
	key--;//轮播图位置
	
	if(key < 1){
		deul.style.left = -deulis[0].offsetWidth * (deulis.length-1)+"px"; //瞬间切换第四张图片位置
		key = 4;  //接着移动到第3种图片
	}
	animate(deul, {"left":-key *deulis[0].offsetWidth});//调用动画效果
	spe--;
	if(spe < 0){
		spe = 3; //小圆点正常切换
	}
	for(var i = 0; i < deolis.length;i++){
		deolis[i].className = "";
	}
	deolis[spe].className = "con";
}


//  ========== 
//  = 为你推荐 = 
//  ========== 
var rec = $("#recomment");
var recbtn = rec.getElementsByClassName("btn")[0];
var recul = rec.getElementsByTagName("ul")[0];
var recli = recul.children;
var reclen = recli.length//原本的长度为8

for(var i =0;i<5;i++){//克隆原本前5个放后面
	recul.appendChild(recli[i].cloneNode(true));
}
for(var i =reclen-5;i<reclen;i++){//克隆原本后5个放前面
	recul.insertBefore(recli[reclen-1].cloneNode(true),recli[0]);
}

recul.style.width = (recli[0].offsetWidth+14) * recli.length+"px";
var rectr = -5*(recli[0].offsetWidth+14)
recul.style.left = rectr + "px";

recbtn.children[0].onclick = rectiemr;
recbtn.children[1].onclick = rectieml;

var reckey = -5;
function rectiemr(){
	reckey--;
	console.log(reckey);
	if(reckey == -13){
		recul.style.left =rectr;
		reckey = -5;
	}
	recul.style.left = reckey*(recli[0].offsetWidth+14) + "px";
}
function rectieml(){
	reckey++;
	if(reckey == 0){
		recul.style.left =-reclen*(recli[0].offsetWidth+14) + "px";
		reckey = -reclen;
	}
	console.log(reckey);
	recul.style.left = reckey*(recli[0].offsetWidth+14) + "px";
}


































