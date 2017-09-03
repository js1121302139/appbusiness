mui.init();

(function($) {
	mui.plusReady(function() {
		window.addEventListener("getInfodata", function() {
			getInfodata();
		})
		var allWebview = plus.webview.all();
		var exitBox = document.querySelector("#exit"); //退出登录按钮
		//退出登录
		exitBox.addEventListener("tap", function() {
			mui.confirm('是否退出登录,退出会清除部分的数据', '提示', ['取消', '确认'], function(e) {
				if(e.index == 1) {
					Fun_App.storagedata("token", " ");
					//关闭所有打开页面
					for(var i = 1; i < allWebview.length; i++) {
						plus.webview.close(allWebview[i].id);
					}
				}
			}, 'div')
		})

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
		setTimeout(function(){
			getInfodata();			
		},0)

		var os = plus.os.name;
		var msgState = Fun_App.getdata("pushMsg");
		var sizeBox = document.querySelector("#Size"),
			msgBtnBox = document.querySelector("#msgBtn"),
			clearSizeBox = document.querySelector("#clearSize");
		//设置是否提示消息
		if(msgState == null) {
			Fun_App.storagedata("pushMsg", true)
		}
		msgBtnBox.addEventListener("tap", function() {
			var isActive = document.getElementById("msgBtn").classList.contains("mui-active");
			Fun_App.storagedata("pushMsg", isActive);
		})
		//通知消息存储
		//透传消息的格式为{title:"通知标题",content:"通知内容",payload:"通知去干嘛这里可以自定义"}
		var localmsg = "";

		//消息推送
		mui.plusReady(function() {

			// 监听点击消息事件
			plus.push.addEventListener("click", function(msg) {
				var payload = (plus.os.name == 'iOS') ? msg.payload : JSON.parse(msg.payload);
				switch(msg.payload) {
					case "LocalMSG":
						console.log("点击本地创建消息启动：");
						break;
					default:
						console.log("点击离线推送消息启动：");
						break;
				}
			}, false);

			// 监听在线消息事件
			plus.push.addEventListener("receive", function(msg) {
				logoutPushMsg(msg);
			}, false);

		});

		//获取穿透参数
		function logoutPushMsg(msg) {
			if(msg.payload) {

				if(typeof(msg.payload) == "string") {
					createLocalPushMsg(msg.content);
					localmsg = eval('(' + msg.content + ')');
				} else {
					var data = JSON.parse(msg.payload);
					createLocalPushMsg(data.content);
					localmsg = msg.content;
				}

			} else {
				console.log("payload: undefined");
			}
		}

		//创建本地推送
		function createLocalPushMsg(content) {

			var options = {
				cover: false,
			};

			plus.push.createMessage(content, "LocalMSG", options);
			if(plus.os.name == "iOS") {
				mui.toast('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
			}

		}
		//是否显示清除缓存
		if(os == "iOS") {
			clearSizeBox.style.display = "none";
		}

		//获取缓存
		getSize()

		function getSize() {
			plus.cache.calculate(function(size) {
				sizeBox.innerText = Math.ceil(size / 1024) + "M";
			})
		}
		//清除缓存
		clearSizeBox.addEventListener("tap", function() {
			mui.confirm("确认清除所有缓存数据么？", "提示", ["确定", "取消"], function(index) {
				if(index.index == 0) {
					plus.cache.clear(function() {
						mui.toast("清除成功!");
						getSize();
					});
				}
			})
		})

		function getVersion() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"version": plus.runtime.version, //版本号
					"type": plus.os.name == "iOS" ? 2 : 1 //1 android；2 ios'
				},
				fun_Success: function(data) {
					if(plus.runtime.version != '2.0.01') {
						//document.querySelector("#newVersion").style.display = "block"
					} else {
						document.querySelector("#newVersion").innerText="2.0.01"
					}
				}
			}
			Fun_App.ExAjax("merchantPerson/getVersion", sendData);
		}
		getVersion()

		function getInfodata() {
			var myHeadImgBox = document.querySelector("#myHeadImg"),
				myNameBox = document.querySelector("#myName"),
				shopPeopleBox = document.querySelector("#shopPeople"),
				myPhoneNumBox = document.querySelector("#myphoneNum");
			var sendData = {
				config: {
					"token": Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					myHeadImgBox.src = picservice + data.data.logoImg; //logo
					myNameBox.innerText = data.data.personCharge;
					myPhoneNumBox.innerText = data.data.personChargePhone;
					shopPeopleBox.innerText = data.data.invitePhone;
					shopPeopleBox.setAttribute("href", data.data.invitePhone)
				}
			}
			shopPeopleBox.addEventListener("tap", function() {
				var callTel = this.getAttribute("href");
				plus.device.dial(callTel, true);
			})
			Fun_App.ExAjax("merchantPerson/index", sendData)
		}

	})
})(mui);