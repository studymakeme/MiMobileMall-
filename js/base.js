			
			// 获取对象
			// id 获取  document.getElementById()   $("#con")
			// class 获取 document.getElementsByClassName()  $(".con")
			// 标签 获取  document.getElementsByTagName()   $("div")
			
			// 你有遇到过js兼容性问题吗
			// 有
			
			function $(str){
				var s = str.substr(0,1); // # . 
				var ss = str.substr(1); //#con ==> con
				switch(s){
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
			
			function getClass(classname){
				// 如果有方法名,是兼容ie6,7,8
				if(document.getElementsByClassName){
					return document.getElementsByClassName(classname);
				}
				
				var con = document.getElementsByTagName("*");  //获取所有标签
				
				var arr = [] ; //存放所有满足条件数组
				// 循环所有标签
				for(var i = 0;i < con.length;i++){
					// li
					// con aa bb
					var spl = con[i].className.split(" "); //数组
					// 字符串切割后的数组
					for(var j = 0;j < spl.length;j++){
						
						if(spl[j] == classname){
							arr.push(con[i]);
						}
					}
				}
				
				return arr;
			}
			// 解决滚动条兼容性
			function scroll(){
				
				if(window.pageYOffset != null){
					return {
						top:window.pageYOffset,
						left:window.pageXOffset
					};
				}
				
				if(document.compatMode == "CSS1Compat"){
					return{
						top: document.documentElement.scrollTop,
						left:document.documentElement.scrollLeft
					}
				}
				
				return{
					top:document.body.scrollTop,
					left:document.body.scrollLeft
				}
				
			}
				
			// 解决client宽高兼容
			function client(){
				//ie9+ 最新浏览器兼容
				if(window.innerHeight != null){
					return {
						width: window.innerWidth,
						height: window.innerHeight
					}
				}
				
				if(document.compatMode === "CSS1Compat"){  //标准浏览器兼容
					return {
						width:document.documentElement.clientWidth,
						height:document.documentElement.clientHeight,
					}
				}
				// 怪异浏览器
				return {
					width: document.body.clientWidth,
					height: document.body.clientHeight
				}
				
			}
		
			// 解决拖动选中文字方案
			function removeAllRange(){
				window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
			}
			
			
			// 封装两个隐藏与显示方法
			
			function show(obj){
				obj.style.display = "block";
			}
			function hide(obj){
				obj.style.display = "none";
			}
			
			
			
			
			// 缓动效果
		function animate(obj ,json,callback){
		clearInterval(obj.timer); //首次清除定时器
		
		obj.timer = setInterval(function(){
			
			var flag = true // 用来判断是否停止定时器
			for( attr in json){
				var current = 0;
				if(attr == "opacity"){
					current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0; //0.3 == 30
				}else{
					current = parseInt(getStyle(obj,attr)); //属性值
				}
				
				var step = (json[attr] - current) /10;//步长
				
				step = step >0 ? Math.ceil(step) : Math.floor(step);
				
				// 判断透明度
				if(attr == "opacity"){
					if("opacity" in obj.style){  //浏览器兼容问题
						obj.style.opacity = (current + step) /100; //0-1 0.3
					}else{
						obj.style.filter = "alpha(opacity:" + (current + step) + ")";
					}
				}else if(attr == "zIndex"){
					obj.style.zIndex = json[attr];
				}else{
					obj.style[attr] = current + step +"px";
				}
				
				// 目标的距离 != 对象距离
				if(json[attr] != current){  //只要其中一个不满足条件,不停止定时器
					flag = false;
				}
			}
			// 清除定时器
			if(flag){
				clearInterval(obj.timer);
				
				// alert("运动结束！！！");
				if(callback){
					callback(); //回调函数  运行函数
				}
			}
			
			
		},20)
	}
	
	
	
	// 样式兼容写法
	function getStyle(obj,attr){
		if(obj.currentStyle){  //判断ie
			return obj.currentStyle[attr];  //返回兼容ie写法
		}else{
			return window.getComputedStyle(obj,null)[attr]; // w3c 浏览器
		}
	}
	
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

//  ========== 
//  = 搜索下拉框 = 
//  ========== 
var search = document.getElementById("search");
var serinp = search.children[0];
var serbtn = search.children[1];
var serwords = search.children[2];
var serlist = search.children[3];
var serclik = true;

serinp.onclick = function() {
	serlist.style.display = "block";
	serwords.style.display = "none";
	serinp.style.borderColor = "#FF6700";
	serbtn.style.borderColor = "#FF6700"
	serbtn.style.borderLeftColor = "";
	serclik = false;
}
serinp.onmouseover = function() {
	if(serclik) {
		serinp.style.borderColor = "#B0B0B0";
		serbtn.style.borderColor = "#B0B0B0"
		serbtn.style.borderLeftColor = "";
	}
}
document.onmousedown = function(event) {
	var event = event || window.event;
	var targetId = event.target ? event.target.id : event.srcElement.id;
	if(targetId != search) {
		serlist.style.display = "none";
		serwords.style.display = "block";
		serinp.style.borderColor = "#E0E0E0";
		serbtn.style.borderColor = "#E0E0E0"
		serbtn.style.borderLeftColor = "";
	}
	serclik = true;
}
serinp.onmouseout = function() {
	if(serclik) {
		serinp.style.borderColor = "#E0E0E0";
		serbtn.style.borderColor = "#E0E0E0"
		serbtn.style.borderLeftColor = "";
	}
}
