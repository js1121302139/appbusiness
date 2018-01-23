(function($) {
	// 主函数
	
	mui.plusReady(function() {
		window.addEventListener("getInfodata", function() {
			getInfodata();
		})
		var feedbackBtnBox = document.querySelector("#feedbackBtn"),
			myHeadImgBox = document.querySelector("#myHeadImg"),
			myNameBox = document.querySelector("#myName"),
			callNumBox = document.querySelector(".callNum"),
			myPhoneNumBox = document.querySelector("#myphoneNum"),
			changeHJBox = document.querySelector("#changeHJ"),
			merchantType = Fun_App.getdata("merchantType"),
			allWebview = plus.webview.all(),
			Sys = (plus.os.name == "Android") ? 1 : 2;
		var updateBtnBox = document.querySelector("#updateBtn");
		var dowonLoadBarBox = document.querySelector(".dowonLoadBar");
		var isDowonLoad = updateBtnBox.getAttribute("isDowonLoad") || false;
		Fun_App.storagedata("HJ", "CS");
		
		
		function downloadInit(downloadUrl, callBack) {
		var dowonloadFileName = downloadUrl.split('/');
		dowonloadFileName = dowonloadFileName[dowonloadFileName.length - 1];
		var _this = this;
		// 创建下载任务
		var task = plus.downloader.createDownload(downloadUrl, {
			filename: "_downloads/DOWAPP/" + dowonloadFileName
		})
		// 监听下载任务 
		task.addEventListener('statechanged', function(task, status) {
			if(status == 200 && status !== null) {
				changeSize(task, callBack);
			}
		})

		plus.io.resolveLocalFileSystemURL('_downloads/DOWAPP/' + dowonloadFileName, function(e) {
			_this.installAPP('_downloads/DOWAPP/' + dowonloadFileName)
			updateBtnBox.setAttribute("isDowonLoad", 'end');
			updateBtnBox.innerText = '可以安装'
		}, function(e) {
			console.log(JSON.stringify(e))
			// 开始下载任务
			task.start();
		})
		// 安装app
		this.installAPP = function(appUrl) {
			plus.runtime.install(appUrl, {
				force: false
			}, function(success) {
				// 安装成功
				updateBox.classList.add("mui-hidden");
			}, function(err) {
				mui.toast('安装出错，请前往应用商店下载安装！');
			})
		}
		// 实时监听安装包下载的进度
		function changeSize(res, callBack) {
			// 计算当前的下载进度
			var downloadSpeed = Number((res.downloadedSize / res.totalSize) * 100).toFixed(2);
			callBack && callBack({
				speed: downloadSpeed,
				state: res.state,
				path: res.options.filename
			});
		}
		// 判断当前运行环境是否安卓
		if(plus.os.name !== 'Android') return false;
		// 获取当前网络类型 
		var netType = plus.networkinfo.getCurrentType();
		// 判断当前网络类型
		if(netType == 1 || netType == 0) {
			mui.toast('当前无网络连接!');
			return false;
		}
		// 监听推送消息点击事件
		plus.push.addEventListener("click", function(msg) {
			// 格式化获取到的payload
			var resData = eval('(' + msg.payload + ')');
			// 若当前的的状态为true就进行安装app
			if(resData.state) {
				// 安装app方法
				_this.installAPP(resData.path)
			}
		}, false);

	}

		//		changeHJBox.addEventListener("tap", function() {
		//			if(Fun_App.getdata("HJ")=="CS"){		
		//				alert("当前环境正式")
		//				plus.cache.clear(function() {});
		//				Fun_App.storagedata("HJ","ZS");
		//			}else{
		//				alert("当前环境测试")
		//				plus.cache.clear(function() {});
		//				Fun_App.storagedata("HJ","CS");
		//			}
		//			
		//		})
		// 若当前是达人就隐藏联系营销顾问
		merchantType == 0 ? feedbackBtnBox.style.display = "none" : '';
		var exitBox = document.querySelector("#exit"); //退出登录按钮
		//退出登录
		exitBox.addEventListener("tap", function() {
			mui.confirm('是否退出登录？', '提示', ['取消', '确认'], function(e) {
				if(e.index == 1) {
					Fun_App.storagedata("token", null);
					Fun_App.storagedata("qrCodeSrc", null);
					Fun_App.storagedata("userInfo", null);
					//关闭所有打开页面
					for(var i = 1; i < allWebview.length; i++) {
						plus.webview.close(allWebview[i].id);
					}
				}
			}, 'div')
		})
		mui(document.body).on('tap', '#helpBook', function(e) {
			Fun_App.openWin('./helpBook.html', 'pop-in', "https://mp.weixin.qq.com/s/ikK__q1sghSsfdCCvaofWw");
		});
		//打开页面
		var pages = {
			"#msgCneter": {
				page: "../work/msgcenter",
			},
			"#safeCenter": {
				page: "./safeCenter"
			},
			"#helpCenter": {
				page: "./helpCenter"
			},
			"#aboutyundui": {
				page: "./aboutyundui"
			},
			"#RightsBook": {
				page: "./rightsBook"
			},
			"#setWifi": {
				page: "./setWifi/index"
			}
		};
		//打开页面
		Fun_App.openWinS(pages)

		setTimeout(function() {
			getInfodata();
		}, 0)

		var os = plus.os.name;
		var msgState = Fun_App.getdata("pushMsg"); // 推送消息
		var sizeBox = document.querySelector("#Size"), // 缓存大小
			msgBtnBox = document.querySelector("#msgBtn"), // 消息提醒
			helpBookBox = document.querySelector("#helpBook"), // 帮助手册
			updateBox = document.querySelector("#updateBox"),
			clearSizeBox = document.querySelector("#clearSize"); // 清除缓存
		//设置是否提示消息
		if(msgState == null) {
			Fun_App.storagedata("pushMsg", true)
		}
		// 当前状态是关闭发送消息则设置消息按钮为关闭状态
		if(msgState == "false") {
			document.getElementById("msgBtn").setAttribute("class", "mui-switch mui-switch-handle msgBtn");
		}
		msgBtnBox.addEventListener("tap", function() {
			var isActive = document.getElementById("msgBtn").classList.contains("mui-active");
			Fun_App.storagedata("pushMsg", isActive);
		})

		//获取缓存
		getSize()

		function getSize() {
			plus.cache.calculate(function(size) {
				sizeBox.innerText = (size / 1024 / 1024).toFixed(2) + "M";
			})
		}
		//清除缓存
		clearSizeBox.addEventListener("tap", function() {
			var token = Fun_App.getdata("token");
			var isOneOpen = Fun_App.getdata("isOneOpen");
			mui.confirm("确认清除所有缓存数据么？", "提示", ["确定", "取消"], function(index) {
				if(index.index == 0) {
					plus.cache.clear(function() {
						mui.toast("清除成功!");
						getSize();
					});
				}
			})
		})
		//新版本下载地址
		var downLoadUrl = null;
		var EditionBox = document.querySelector("#Edition");
		var isNewV = null,
			vData = [{
				"tit": "发现新版本",
				"content": "发现兑咖联盟新版本，是否立即下载更新？"
			}, {
				"tit": "前往AppStore更新？",
				"content": "前往AppStore"
			}];
		EditionBox.addEventListener("tap", function() {
			if(isNewV != null) {
				mui.confirm(vData[Sys - 1].content, vData[Sys - 1].tit, ['下次再说', '欣然前往'], function(e) {
					if(e.index) {
						if(Sys == 2) {
							plus.runtime.openURL("https://itunes.apple.com/us/app/%E5%85%91%E5%92%96%E8%81%94%E7%9B%9F/id1252521011?mt=8");
						} else {
							plus.runtime.openURL(downLoadUrl)
						}
					}
				}, 'div')
			}
		})
		//判断是否有新版本
		showUpdateVersion();

		function showUpdateVersion() {
			var version = (plus.os.name == "Android") ? 1 : 2;
			var nowEdition = plus.runtime.version;
			var updateDate = {
				config: {
					"token": Fun_App.getdata("token"),
					"version": nowEdition, //版本号
					"type": version, // 系统类型 1 安卓 2 ios
				},
				fun_Success: function(data) {
					var item = data.data;
					try {
						console.log(item.version + "-------")
						if(data.success) {
							isNewV = 'new';
							downLoadUrl = item.filePath;
							document.getElementById("updateVersionTxt").innerHTML = "v" + item.version;

							var descStr = item.description;
							var descArr = descStr.split("#");
							for(var i = 0; i < descArr.length; i++) {
								if(descArr[i] == '' || descArr[i] == null) {
									continue;
								}
								document.getElementById("updateDestTxt").innerHTML += '<li>' + descArr[i] + '</li>';
							}
							updateBox.classList.remove("mui-hidden");
						} else {
							return false;
						}
					} catch(e) {

					}
				}
			}
			Fun_App.ExAjax("merchantPerson/getVersion", updateDate);
		}

		//关闭版本更新
		mui(document.body).on('tap', '#closeUpdateBtn', function(e) {
			updateBox.classList.add("mui-hidden");
		});

		//开始下载新版本
		var upAPP = null,
			appPath = '';
		mui(document.body).on('tap', '#updateBtn', function(e) {
			if(plus.os.name === "Android") {
				if(!isDowonLoad) {
					updateBtnBox.innerText = '正在下载···'
					upAPP = new downloadInit('https://api.duikavip.com/portal/duika_v1.3.4.apk', function(res) {
						updateBtnBox.setAttribute("isDowonLoad", 'start');
						dowonLoadBarBox.style.width = res.speed + "%";
						if(res.state == 4) {
							updateBtnBox.setAttribute("isDowonLoad", 'end');
							updateBtnBox.innerText = '可以安装'
							appPath = res.path;
						}
					});
				}
				if(isDowonLoad == 'end') {
					console.log(appPath);
					upAPP.installAPP(appPath);
				}
			} else {
				plus.runtime.openURL("https://itunes.apple.com/us/app/%E5%85%91%E5%92%96%E8%81%94%E7%9B%9F/id1252521011?mt=8");
			}
		});
		console.log(plus.runtime.version)

		function getInfodata() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					myHeadImgBox.src = picservice + data.data.logoImg; //logo
					myNameBox.innerText = data.data.personCharge;
					myPhoneNumBox.innerText = data.data.personChargePhone;
					feedbackBtnBox.querySelector(".shopPeople").innerText = data.data.invitePhone;
					feedbackBtnBox.querySelector("a").setAttribute("href", data.data.invitePhone)
				}
			}
			callNumBox.addEventListener("tap", function() {
				var callTel = this.querySelector("a").getAttribute("href");
				plus.device.dial(callTel, true);
			})
			Fun_App.ExAjax("merchantPerson/index", sendData)
		}

	})
})(mui);