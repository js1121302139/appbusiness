/*
 * 服务器的地址
 * http://192.168.1.220/api/login
 */
//内网地址
/*var strservicef = 'http://192.168.1.220/merchant/';
var picservice = 'http://192.168.1.220/ejsimage';*/
//测试环境
var strservicef = 'http://www.yunduiwang.com/merchant/';
var picservice = 'http://www.yunduiwang.com:81/ejsimage';
//外网链接
/*var strservicef = 'http://sj.duikavip.com/merchant/';
var picservice =  'http://image.duikavip.com/ejsimage';*/

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
				//                  styles:{
				//                    top:"44px",
				//                    bottom:"52px",
				//                    width:"100%",
				//                    height:"100%"
				//                  },
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
				popGesture: 'hide'
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
	ExAjax: function(url, rdata) {

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
				url: strservicef + url,
				type: "post",
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
				mui.toast('上传完成!')
				console.log(JSON.stringify(e)+"-->")
				var data = JSON.parse(e.responseText.replace(/\\/g, ""))
				callBack(data);
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
	var networkinfo = ["网络连接状态未知", "未连接网络", "无线WIFI网络", "蜂窝移动2G网络", "蜂窝移动3G网络", "蜂窝移动4G网络", "蜂窝移动5G网络"]
	document.addEventListener("netchange", function() {
		var state = Fun_App.getNetWorkState();
		mui.toast('当前' + networkinfo[(state - 1)]);
		return false;
	}, false)
	plus.navigator.setStatusBarStyle("dark")
})

window.addEventListener("tap", function() {
	var topDoms = document.querySelector('header');
	if(topDoms!=null){
		var topDomsClass=topDoms.getAttribute("class");
		if(topDomsClass.indexOf('topBar') != -1) {
			/*plus.navigator.setStatusBarStyle("light")*/
			getComputedStyle(document.querySelector(".topBar", false))['backgroundColor'] == "rgb(255, 255, 255)" ? plus.navigator.setStatusBarStyle("dark") :""
		}
	}else{
		plus.navigator.setStatusBarStyle("light")
	}
})