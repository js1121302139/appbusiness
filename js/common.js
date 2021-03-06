//function plusReady() {
//	// 设置系统状态栏背景为蓝色
//	//plus.navigator.setStatusBarBackground("#FFFFFF");
//
//	// 设置系统状态栏样式为浅色文字
//	//plus.navigator.setStatusBarStyle("dark");
//
//}

//图片懒加载
//mui('body').imageLazyload({});

//if(window.plus) {
//	plusReady();
//} else {
//	document.addEventListener("plusready", plusReady, false);
//}

//页面加载完
mui.plusReady(function() {
	//	var _self;
	//	_self = plus.webview.currentWebview();
	//	_self.setPullToRefresh({
	//		support: true,
	//		height: '50px',
	//		range: '100px',
	//		style: 'circle',
	//		offset: '1px'
	//	}, pulldownRefresh);

	/**
	 * 下拉刷新具体业务实现
	 */
	//	function pulldownRefresh() {
	//		setTimeout(function() {
	//			location.reload();
	//			_self.endPullToRefresh();
	//		}, 1500);
	//	}

	//设置状态栏颜色
	//	mui.init({
	//		statusBarBackground: '#ffffff'
	//	});
	//
	//	plus.webview.currentWebview().setStyle({
	//		scrollIndicator: 'none',
	//	});

	//屏幕锁定为竖屏
	plus.screen.lockOrientation("portrait-primary");

	plus.navigator.setStatusBarBackground('#ffffff');

	if(plus.navigator.isImmersedStatusbar()) {
		//plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
		//plus.navigator.setStatusBarStyle('UIStatusBarStyleBlackOpaque');
	}

});

var CheckValue = function() {
	this.checkEmail = function(val) {
		console.log(val)
	}
	this.checkPhoneNum = function(val) {
		var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
		if(val != '' && val != null) {
			if(reg.test(val)) {
				return val;
			} else {
				mui.toast("请输入正确的手机号！");
				return false;
			}
		}
	}
	this.checkCode = function(val) {
		var reg = /[\S]{6,6}/;
		if(val != '' && val != null) {
			if(reg.test(val)) {
				return val;
			} else {
				mui.toast("请输入6位正确格式的验证码");
				return false;
			}
		}
	}
	this.checkPwd = function(val) {
		var reg = /[\S]{6,16}/;
		if(val != '' && val != null) {
			if(reg.test(val)) {
				return val;
			} else {
				mui.toast("请输入6-12位非空白字符的密码！");
				return false;
			}
		}

	}
	this.checkNum = function(val) {
		if(val != '' && val != null) {
			if(!isNaN(val)) {
				return val;
			} else {
				mui.toast("请输入数字！");
				return false;
			}
		}
	}
}
var changeClass = {
	addclass: function(el, style) {
		var preStyle = el.getAttribute("class");
		if(typeof style != "Object") {
			el.setAttribute("class", preStyle + " " + style)
		} else {
			var preStyle = el.getAttribute("class");
			for(i in style) {
				el.setAttribute("class", preStyle + " " + style[i])
			}
		}

	}
}
//
//function bubbleSort(array, key) {
//	var length = array.length,
//		i,
//		j,
//		date=new Date(),
//		temp;
//	for(i = length - 1; 0 < i; i--) {
//		for(j= 0; j < i; j++) {
//			if(new Date(array[j][key]) instanceof "Date" && new Date(array[j + 1][key]) instanceof "Date"){
//				array[j][key] = date(array[j][key]);
//				array[j + 1][key] = date(array[j + 1][key]);
//			}
//			if(array[j][key] > array[j + 1][key]) {
//				temp = array[j];
//				array[j] = array[j + 1];
//				array[j + 1] = temp;
//			}
//		}
//	}
//	return array;
//}