mui.init();

(function($) {
	mui.plusReady(function() {

		window.addEventListener("getInfodata", function() {
			getInfodata();
		})
		var allWebview = plus.webview.all();
		var Sys = (plus.os.name == "Android") ? 1 : 2;
		var exitBox = document.querySelector("#exit"); //退出登录按钮
		//退出登录
		exitBox.addEventListener("tap", function() {
			mui.confirm('是否退出登录？', '提示', ['取消', '确认'], function(e) {
				if(e.index == 1) {
					Fun_App.storagedata("token", null)
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
			}
		};
		Fun_App.openWinS(pages)

		/*mui.plusReady(function() {
			nowEdition = plus.runtime.version;
			var EditionCodeBox = document.querySelector(".EditionCode");
			EditionCodeBox.innerText += nowEdition;

		})
		//版本管理
		document.querySelector("#Edition").addEventListener("tap", function() {
			if(nowEdition != nextEdition) {
				alert()
			} 
		})*/
		setTimeout(function() {
			getInfodata();
		}, 0)

		var os = plus.os.name;
		var msgState = Fun_App.getdata("pushMsg"); // 推送消息
		var sizeBox = document.querySelector("#Size"), // 缓存大小
			msgBtnBox = document.querySelector("#msgBtn"), // 消息提醒
			helpBookBox = document.querySelector("#helpBook"), // 帮助手册
			clearSizeBox = document.querySelector("#clearSize"); // 清除缓存
		// 打开操作手册
		/*helpBookBox.addEventListener("tap", function() {
			plus.runtime.openURL("https://mp.weixin.qq.com/s/ikK__q1sghSsfdCCvaofWw")
		})*/

		//设置是否提示消息
		if(msgState == null) {
			Fun_App.storagedata("pushMsg", true)
		}
		msgBtnBox.addEventListener("tap", function() {
			var isActive = document.getElementById("msgBtn").classList.contains("mui-active");
			Fun_App.storagedata("pushMsg", isActive);
			console.log(Fun_App.getdata("pushMsg"))
		})

		//是否显示清除缓存
		/*if(os == "iOS") {
			clearSizeBox.style.display = "none"; 
		}*/

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
		/*var EditionBox = document.querySelector("#Edition");
		var isNewV = null,
			vData = [{
				"tit": "发现新版本",
				"content": "发现兑咖联盟新版本，是否立即下载更新？"
			}, {
				"tit": "前往AppStore更新？",
				"content": "前往AppStore"
			}],
			newVurl = null;
		EditionBox.addEventListener("tap", function() {
			if(isNewV != null) {
				mui.confirm(vData[Sys - 1].content, vData[Sys - 1].tit, ['下次再说', '欣然前往'], function(e) {
					if(e.index) {
						if(Sys == 2) {

							plus.runtime.openURL("https://itunes.apple.com/us/app/%E5%85%91%E5%92%96%E8%81%94%E7%9B%9F/id1252521011?mt=8");
						} else {
							plus.runtime.openURL(newVurl)
						}
					}
				}, 'div')
			}
		})

		function getVersion() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"version": plus.runtime.version, //版本号
					"type": Sys //1 android；2 ios'
				},
				fun_Success: function(data) {
					var data = {
						"success": true,
						"rows": [],
						"data": {
							"token": null,
							"deviceId": null,
							"merchantId": null,
							"source": null,
							"version": "1.8.0",
							"type": 1,
							"filePath": "http://www.baidu.com",
							"description": "测试测试"
						},
						"message": null,
						"total": 0,
						"backUrl": null,
						"footer": []
					}
					newVurl = (data.data.filePath != null) ? data.data.filePath : '';
					if(plus.runtime.version != data.data.version) {
						isNewV = "new";
						newVurl = data.data.filePath;
						document.querySelector("#newVersion").style.display = "block";
					} else {
						document.querySelector("#newVersion").style.display = "none";
						document.querySelector(".EditionCode").innerText += " " + plus.runtime.version;
					}
				}
			}
			Fun_App.ExAjax("merchantPerson/getVersion", sendData);
		}
		getVersion()*/
		//新版本下载地址
		var downLoadUrl = null;
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
					if(data.success) {
						var item = data.data;
						try {
							console.log(item.version)
							if(plus.runtime.version != item.version) {
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
							mui.toast('版本号获取错误!')
							//TODO handle the exception
						}

					} else {
						return false;
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
		mui(document.body).on('tap', '#updateBtn', function(e) {
			updateBox.classList.add("mui-hidden");
			if(plus.os.name == "Android") {
				plus.runtime.openURL(downLoadUrl);
			} else {
				plus.runtime.openURL("https://itunes.apple.com/us/app/%E5%85%91%E5%92%96%E8%81%94%E7%9B%9F/id1252521011?mt=8");
			}
		});
		console.log(plus.runtime.version)

		function getInfodata() {
			var myHeadImgBox = document.querySelector("#myHeadImg"),
				myNameBox = document.querySelector("#myName"),
				feedbackBtnBox = document.querySelector("#feedbackBtn"),
				callNumBox = document.querySelector(".callNum")
			myPhoneNumBox = document.querySelector("#myphoneNum");
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
				console.log(callTel)
				plus.device.dial(callTel, true);
			})
			Fun_App.ExAjax("merchantPerson/index", sendData)
		}

	})
})(mui);