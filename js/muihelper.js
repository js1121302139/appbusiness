///*
// * 服务器的地址
// * http://192.168.1.220/api/login
// */
//// 内网地址
//var strservicef = 'http://192.168.1.62:8083/';
//// var picservice = 'http://test.duikavip.com:8090/image/';
// 开发环境
var luckservice = 'http://192.168.1.8:8082/acti/'; // 一元抽奖的服务地址
var encrystrservicef = 'http://192.168.1.9:9090/dev/api/';
var strservicef = 'http://192.168.1.9:9090/dev/merchant/';
var picservice = 'http://test.duikavip.com:9090/ejsimage';

//测试环境

//var luckservice = 'http://192.168.1.8:8082/acti/'; // 一元抽奖的服务地址
//var encrystrservicef = 'http://test.duikavip.com:8085/api/';
//var strservicef = 'http://test.duikavip.com:8084/merchant/';
//var picservice = 'http://test.duikavip.com:8084/ejsimage';

////外网链接

//var encrystrservicef = 'http://api.duikavip.com:81/api/';
//var strservicef = 'http://sj.duikavip.com/merchant/';
//var luckservice = 'http://api.duikavip.com/acti/'; // 一元抽奖的服务地址
//var picservice = 'http://image.duikavip.com/ejsimage';

var _self;
/* 
 * 主要的公共函数
 */
var Fun_App = {
	/**
	 * 完整的打开新页面方法
	 * @param {Object} _url
	 */
	OpenPage: function(id, gethtmlurl, action, sendvalue) {
		var page = mui.preload({
			url: gethtmlurl,
			id: gethtmlurl,
		});
		mui(document.body).on('tap', id, function(e) {
			mui.openWindow({
				url: gethtmlurl,
				id: gethtmlurl,
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				extras: {
					kid: sendvalue
				},
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true
					aniShow: action, //页面显示动画，默认为”slide-in-right“；
					duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: false //自动显示等待框，默认为true
					//title: "正在加载..." //等待对话框上显示的提示内容
				}
			})
		});
	},
	/**
	 * 
	 * 单纯打开页面
	 */
	openWin: function(gethtmlurl, action, sendvalue) {
		mui.openWindow({
			url: gethtmlurl,
			id: gethtmlurl,
			preload: true,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				aniShow: action, //页面显示动画，默认为”slide-in-right“；
				duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			},
			extras: {
				kid: sendvalue
			},
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			styles: {
				popGesture: 'close',
				backButtonAutoControl: "close",
				bounceBackground: "#ffffff"
			},
			waiting: {
				autoShow: false
			}
		});
	},
	/**
	 * 
	 * 绑定打开多个页面
	 * @param {Object} pages{el:{page:页面的地址,animete:动画效果,sendvalue:页面传递的值}}
	 */
	openWinS: function(pages) {
		mui.each(pages, function(i, item) {
			document.querySelector(i).addEventListener("tap", function() {
				Fun_App.openWin(item.page + ".html", (item.animete) == null ? "pop-in" : item.animete, (item.id == null) ? null : item.id, (item.sendvalue == null) ? null : item.id);
			});
		});
	},
	/*
	 * 页面间传值的获取
	 * 页面间传值的获取
	 */
	getextrasdata: function(kid) {
		var self = plus.webview.currentWebview();
		return self.kid;
	},
	/*  
	 * ajax 数据请求方法
	 */
	ExAjax: function(url, rdata, type) {
		// 判断请求的类型是什么
		this.type = (type == undefined) ? "POST" : type;
		nowNetWorkState = this.getNetWorkState(); //现在的网络状态
		//mui.toast("状态码："+nowNetWorkState); 
		if(nowNetWorkState == 0) {
			mui.toast("你的网络似乎开小差去咯！")
			var historyData = JSON.parse(this.getdata(url)); //本地存储的数据
			rdata.fun_Success(historyData)
			return false;
		}
		/*var waiting = plus.nativeUI.showWaiting();*/
		else {
			mui.ajax({
				// 根据请求的类型修改服务器的地址
				url: (this.type == "POST") ? strservicef + url : luckservice + url,
				type: this.type,
				data: rdata.config,
				dataType: 'json',
				timeout: 10000,
				async: false,
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(data) {
					/*waiting.close();*/
					console.log(url + "data:" + JSON.stringify(data));
					if(data.message != null) {
						if(data.message == "您还没登录，请先登录！") {
							//在其他设备登录的情况下直接关闭所有窗口
							Fun_App.storagedata("token", " ");
							var allwin = plus.webview.all();
							for(var i = 1; i < allwin.length; i++) {
								mui.toast("你的账号在其他设备登录,请保管好你的密码！")
								plus.webview.close(allwin[i].id);
							}
						}
					}

					rdata.fun_Success(data);
					//存储数据
					var dataStr = JSON.stringify(data);
					Fun_App.storagedata(url, dataStr);
				},
				error: function(xhr, type, errorThrown) {
					console.log(JSON.stringify(xhr) + type + "---" + errorThrown);
				}
			});
		}
	},
	ExEncryptionAjax: function(url, rdata, async, requestMethod, method) {
		console.log(JSON.stringify("1.接口url：" + url + "页面请求参数:" + JSON.stringify(rdata.config)));
		var requestMethod = (requestMethod == "" || requestMethod == null) ? "get" : requestMethod;
		var appKey = "29880011",
			secret = "915503ccd14d861803f935f500f00a5d",
			version = "1.0",
			timestamp = this.getNowFormatDate(),
			sign, urlStr, playload;
		var state = ((async == "" || async == null) ? true : false);
		var nowNetWorkState = this.getNetWorkState(); //现在的网络状态
		if(nowNetWorkState == 1 || nowNetWorkState == 0) {
			mui.toast("你的网络似乎开小差去咯！");
			return false;
		}
		if(requestMethod === 'get') {
			playload = rdata.config;
			var list = [
				'appKey=' + appKey,
				'method=' + method, //API接口名称
				'timestamp=' + timestamp, //时间戳
				'version=' + version //版本号
			];
			for(var i in playload) {
				console.log(playload[i]+'---------<<<')
				var str = i + "=" + String(playload[i]).replace(/@/g,'=');
				list.push(str);
			}
			var dataStr = list.sort().join("").split('=').join('');
			console.log('MD5<<----' + secret + dataStr + secret)
			sign = md5(secret + dataStr + secret);
			list.push('sign=' + sign);
			urlStr = list.sort().join("&");
			mui.ajax({
				url: encrystrservicef + url + "?" + urlStr,
				type: requestMethod,
				dataType: 'json',
				timeout: 10000,
				async: state,
				headers: {
					'Content-Type': 'application/json'
				},
				beforeSend: function(xhr, settings) {
					console.log("beforeSend:" + url + " xhr: " + xhr.responseText + " status: " + JSON.stringify(settings));
				},
				complete: function(xhr, status) {
					//console.log(url + " xhr: " + JSON.stringify(xhr) + " status: " + JSON.stringify(status));
				},
				success: function(data) {
					//waiting.close();
					if(data == null || data == "") {
						//mui.toast("系统异常");
						//mui.toast("系统繁忙，请重试。" + url);
						console.log("******接口无数据返回******" + url + " " + data);
						return false;
					}
					//console.log("2." + JSON.stringify(data));

					if(data.message != null) {
						if(data.message == "您还没登录，请先登录！") {
							//在其他设备登录的情况下直接关闭所有窗口
							Fun_App.storagedata("token", "");
						}
					}

					rdata.fun_Success(data);
				},
				error: function(xhr, type, errorThrown) {
					//type：错误描述，可取值："timeout", "error", "abort", "parsererror"、"null"
					//errorThrown：可捕获的异常对象
					//rdata.fun_Fail();
					//mui.toast("接口错误，请重试。" + url);
					mui.toast("系统繁忙，请稍后重试");
					console.log("******系统异常******" + url + xhr.responseText + type + "---" + errorThrown);
				}
			});
		} else {
			if(typeof rdata.config === "string") {
				playload = rdata.config;
				//console.log(rdata.config + "rdata.configStr")
			} else {
				playload = JSON.stringify(rdata.config);
			}
			var list = [
				'appKey=' + appKey,
				'method=' + method, //API接口名称
				'timestamp=' + timestamp, //时间戳
				'version=' + version, //版本号
				'playload=' + playload //postData
			];

			if(rdata.data_Config) {
				for(var i = 0; i < rdata.data_Config.length; i++) {
					list.push(rdata.data_Config[i]);
				}
			}

			var dataStr = list.sort().join("").split('=').join('');
			dataStr = dataStr.replace(/@/g, "=");
			//console.log("请求体:" + dataStr);
			console.log('MD5<<----' + secret + dataStr + secret)
			sign = md5(secret + dataStr + secret);
			try {
				playload = playload.replace(/@/g, "=");
				
				for(var i = 0; i < list.length; i++) {
					if(list[i].indexOf("playload=") != -1) {
						list[i] = "playload=" + playload;
					}
				}
				//console.log("playload+ " + JSON.stringify(list))
			} catch(e) {
				//TODO handle the exception
			}
			/*console.log("list3" + JSON.stringify(list));
			console.log("secret:" + secret + dataStr + secret);
			console.log("sign:" + sign);*/
			list.splice(list.indexOf('playload=' + playload), 1);
			console.log("list4" + JSON.stringify(list));
			list.push('sign=' + sign);
			urlStr = list.sort().join("&");
			try {
				urlStr = urlStr.replace(/@/g, "=");
				urlStr = urlStr.replace(/==/g,'%3D%3D')
			} catch(e) {
				//TODO handle the exception
			}
			//console.log('urlStr:' + urlStr);
			//console.log("list5" + JSON.stringify(list));
			mui.ajax({
				url: encrystrservicef + url + "?" + urlStr,
				type: requestMethod,
				data: playload,
				dataType: 'json',
				timeout: 10000,
				async: state,
				headers: {
					'Content-Type': 'application/json'
				},
				beforeSend: function(xhr, settings) {
					console.log("beforeSend:" + url + " xhr: " + xhr.responseText + " status: " + JSON.stringify(settings));
				},
				complete: function(xhr, status) {
					//console.log(url + " xhr: " + JSON.stringify(xhr) + " status: " + JSON.stringify(status));
				},
				success: function(data) {
					//waiting.close();
					if(data == null || data == "") {
						//mui.toast("系统异常");
						//mui.toast("系统繁忙，请重试。" + url);
						console.log("******接口无数据返回******" + url + " " + data);
						return false;
					}
					console.log("接口url：" + url + " 返回数据:" + JSON.stringify(data));

					if(data.message != null) {
						if(data.message == "您还没登录，请先登录！") {
							//在其他设备登录的情况下直接关闭所有窗口
							Fun_App.storagedata("token", "");
						}
					}

					rdata.fun_Success(data);
				},
				error: function(xhr, type, errorThrown) {
					//type：错误描述，可取值："timeout", "error", "abort", "parsererror"、"null"
					//errorThrown：可捕获的异常对象
					//rdata.fun_Fail();
					//mui.toast("接口错误，请重试。" + url);
					mui.toast("系统繁忙，请稍后重试");
					console.log("******系统异常******" + url + xhr.responseText + type + "---" + errorThrown);
				}
			});
		}
	},
	/**
	 * 获取当前时间
	 */
	getNowFormatDate: function() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var hours = date.getHours();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if(minutes >= 0 && minutes <= 9) {
			minutes = "0" + minutes;
		}
		if(seconds >= 0 && seconds <= 9) {
			seconds = "0" + seconds;
		}
		if(hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + hours + seperator2 + minutes +
			seperator2 + seconds;
		return currentdate;
	},
	/*
	 * 数据存储的函数
	 */
	storagedata: function(kname, sdata) {
		localStorage.setItem(kname, sdata);
	},
	/*
	 * 数据读取
	 */
	getdata: function(kname) {
		return localStorage.getItem(kname);
	},
	/*
	 * 数据删除
	 */
	deldata: function(kname) {
		localStorage.removeItem(kname);
	},
	/*
	 * 手势配置
	 */
	gesture: function() {
		var gs = {
			gestureConfig: {
				tap: true, //默认为true
				doubletap: true, //默认为false
				longtap: true, //默认为false
				swipe: true, //默认为true
				drag: true //默认为true
			}
		};
		return gs;
	},
	/*
	 * 隐藏滚动条
	 */
	delscroll: function() {
		plus.webview.currentWebview().setStyle({
			scrollIndicator: 'none',
		});
	},
	/* 
	 * 返回键退出程序
	 * 1秒内，连续两次按返回键，则退出应用
	 */
	FunBackQuitAppL: function() {
		var backFirst = null;
		this.QuitApp = function() {
			//首次按键，提示‘再按一次退出应用’
			if(!backFirst) {
				backFirst = new Date().getTime();
				mui.toast('再按一次退出应用程序');
				setTimeout(function() {
					backFirst = null;
				}, 1000);
			} else {
				if((new Date()).getTime() - backFirst < 1000) {
					plus.runtime.quit();
				}
			}
		}
	},
	/**
	 * 下拉刷新
	 * 
	 */
	pulldownRefresh: function() {
		_self = plus.webview.currentWebview();
		_self.setPullToRefresh({
			support: true,
			height: '50px',
			range: '100px',
			style: 'circle',
			offset: '1px'
		}, FunPpulldownRefresh);
	},
	/**
	 * 关闭当前页面
	 * 
	 */
	closeCurrentPage: function() {
		mui.back = function() {
			mui.currentWebview.close();
		}
	},
	/*
	 获取当前的网络状态
	 * */
	getNetWorkState: function() {
		return plus.networkinfo.getCurrentType()
	},
	/*
	 *判断json对象是否为空 
	 * continueKey为跳过检测的字段
	 * */
	checkObjIsNull: function(Data, continueKey) {
		for(i in Data) {
			if(continueKey != null) {
				if(continueKey.indexOf(i) != -1) {
					continue;
				}
			}
			if(Data[i] === null || Data[i] === "") return false;
		}
	},
	// 强力判断对象是否为空
	findObj: function(val, continueKey) {
		if(val instanceof Array && val.length) return true;
		if(val instanceof Object) {
			for(var key in val) {
				try {
					if(continueKey.indexOf(key) !== -1) {
						continue;
					}
				} catch(e) {
					//TODO handle the exception
					console.log('没有任何要跳过的字段!');
				}
				if(val[key] === '' || val[key] === null) {
					console.log(key + "为空")
					return false;
				};
				if(val[key] instanceof Object) Fun_App.findObj(val[key], continueKey);
			}
		}
	},
	/*
	 *判断数组json对象是否为空 
	 * continueKey为跳过检测的字段
	 * */
	checkArrayObjIsNull: function(Data, continueKey) {
		var keys = Object.keys(Data[0]);
		for(i in Data) {
			for(j in Data[i]) {
				if(continueKey != null) {
					if(continueKey.indexOf(i) != -1) {
						continue;
					}
				}
				if(Data[i][j] === null || Data[i][j] === "") return false;
			}
		}
	},

	/*
	 * 检测时间
	 * 开始时间 结束时间
	 */
	checkDateTime: function(date1, date2) {
		if((date1 == '' || date1 == null) || (date2 == '' || date2 == null)) {
			mui.toast('缺少时间');
			return false;
		} else {
			this.date1 = date1.replace(/-/g, "/");
			this.date2 = date2.replace(/-/g, "/");
			var dateTime1 = new Date(this.date1).getTime();
			var dateTime2 = new Date(this.date2).getTime();
			if(dateTime2 < dateTime1) {
				mui.toast('结束时间不能小于起始时间!')
				return false;
			}
		}
	},
	/*
	 *文件上传
	 * */
	uploadFiles: function(fielUrl, callBack, modelImg) {
		var modelImg = modelImg;
		mui.toast('上传图片中...')
		var task = plus.uploader.createUpload(strservicef + "merchantParty/uploadFiles", {
			method: "POST"
		}, function(e, s) {
			if(s == 200) {
				console.log(JSON.stringify(e) + "-->")
				try {
					var data = JSON.parse(e.responseText.replace(/\\/g, ""));
					mui.toast('上传完成!');
					callBack(data);
				} catch(e) {
					//TODO handle the exception
					mui.toast('上传失败!');
					console.log("上传图片异常" + e)
				}
			}
		})
		task.addFile(fielUrl, {
			key: modelImg
		});
		task.addData("token", Fun_App.getdata("token"));
		task.start();
	},
	zipImg: function(url, callBack) {
		mui.toast('图片压缩中!')
		var files = url.split("/").pop();
		plus.zip.compressImage({
				src: url,
				dst: "_doc/" + files,
				overwrite: true,
				quality: 25
			},
			function(i) {
				callBack(i.target)
			},
			function() {
				alert("图片压缩失败!")
			})

	},
	openCamera: function(cameraId) {
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(e) {

		}, function(e) {

		}, {
			filename: "_doc/qrcode.jpg",
			index: 1
		})
	},
	// 关闭当前页
	closeCurrentPage: function() {
		mui.back = function() {
			plus.navigator.setStatusBarStyle("dark");
			mui.currentWebview.close();
		}
	},
	// 合并多个对象
	assign: function() {
		var obj = arguments[0];
		for(var i = 1; i < arguments.length; i++) {
			if(typeof arguments[i] !== "object") return "不是一个有效的对象";
			for(j in arguments[i]) {
				obj[j] = arguments[i][j]
			}
			console.log(JSON.stringify(obj))
		}
		console.log(JSON.stringify(obj))
		return obj;
	},
	// 对象转数组
	entries: function(val) {
		var arr = [];
		for(i in val) {
			arr.push([i, val[i]]);
		}
		return arr;
	},
	min9: function(val) {
		return val <= 9 ? '0' + val : val;
	},
	dateFormat: function(date) {
		if(!date instanceof Date) {
			console.log('MMP时间格式错误!');
			return false;
		};
		var _date = {
			year: date.getFullYear(),
			mouth: Fun_App.min9(date.getMonth() + 1),
			day: Fun_App.min9(date.getDate()),
			h: Fun_App.min9(date.getHours()),
			m: Fun_App.min9(date.getMinutes()),
			s: Fun_App.min9(date.getSeconds())
		}
		return Fun_App.assign(_date, {
			textday: _date.year + '-' + _date.mouth + '-' + _date.day,
			textTime: _date.year + '-' + _date.mouth + '-' + _date.day + " " + _date.h + ':' + _date.m + ":" + _date.s
		})
	}
}

/**
 * 刷新方法
 */
function FunPpulldownRefresh() {
	setTimeout(function() {
		location.reload();
		_self.endPullToRefresh();
	}, 1500);
}

/*
 * 监听返回按钮
 */
mui("body").on("tap", ".mui-action-back", function() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
})

/*
 *页码的长度
 */
var pageLen = 20;

/*
 *角色的等级
 * */
var jobCode = {
	'BOSS': "BOSS",
	'SHOPOWNER': "SHOPOWNER",
	'STAFF': "STAFF"
};

/*实时监测网络状态变化*/
mui.plusReady(function() {
	var networkinfo = ["未连接网络", "未连接网络", "无线WIFI网络", "蜂窝移动2G网络", "蜂窝移动3G网络", "蜂窝移动4G网络", "蜂窝移动5G网络"]
	document.addEventListener("netchange", function() {
		var state = Fun_App.getNetWorkState();
		mui.toast('当前' + networkinfo[(state - 1)]);
		return false;
	}, false)
})

mui.plusReady(function() {
	plus.key.addEventListener('backbutton', function() {
		if(plus.webview.currentWebview().id != "page/work/home.html") {
			plus.webview.currentWebview().close();
		}
		// console.log(JSON.stringify(plus.webview.currentWebview()))
	}, false);
})
window.addEventListener("tap", function() {
	var topDoms = document.querySelector('header');
	if(topDoms) {
		try {
			var topDomsClass = topDoms.getAttribute("class");

			if(topDomsClass.indexOf('topBar') != -1) {
				/*plus.navigator.setStatusBarStyle("light")*/
				//console.log(topDomsClass.indexOf('topBar') != -1)
				//getComputedStyle(document.querySelector(".topBar", false))['backgroundColor'] == "rgb(255, 255, 255)" ? plus.navigator.setStatusBarStyle("dark") : ""
			}
		} catch(e) {
			//TODO handle the exception
			console.log("获取返回按钮失败!");
		}

	} else {
		plus.navigator.setStatusBarStyle("light")
	}
})

window.addEventListener('resize', function() {
	if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
		window.setTimeout(function() {
			document.activeElement.scrollIntoViewIfNeeded();
		}, 0);
	}
})
//if(Fun_App.getdata("HJ") == "CS" || Fun_App.getdata("HJ") ==null || Fun_App.getdata("HJ") =='') {
//	var luckservice = 'http://192.168.1.8:8082/acti/'; // 一元抽奖的服务地址
//	var encrystrservicef = 'http://test.duikavip.com:9090/api/';
//	var strservicef = 'http://test.duikavip.com:8084/merchant/';
//	var picservice = 'http://test.duikavip.com:9090/ejsimage';
//} else {
//	var luckservice = 'http://api.duikavip.com/acti/'; // 一元抽奖的服务地址
//	var encrystrservicef = 'http://api.duikavip.com:81/api/';
//	var strservicef = 'http://sj.duikavip.com/merchant/';
//	var picservice = 'http://image.duikavip.com/ejsimage';
//}
//window.addEventListener('resize', function() {
//	if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
//		window.setTimeout(function() {
//			document.activeElement.scrollIntoViewIfNeeded();
//		}, 0);
//	}
//})