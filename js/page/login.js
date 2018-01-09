var Vue = new Vue({
	el: "#login",
	data: function() {
		return {
			pageData: {
				"userName": '',
				"password": '',
			},
			isSend: false,
			isLogin: false,
			//检测值的函数
			checkVal: new CheckValue()
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			plus.navigator.setStatusBarStyle("light");
			if(Fun_App.getdata("isOneOpen") == null) {
				Fun_App.storagedata('isOneOpen', 'yes')
				Fun_App.openWin('./guidePage.html', 'pop-in', '')
			}
//			if(Fun_App.getdata("token") != null && Fun_App.getdata("token") != " ") {
//				
//				Fun_App.openWin('index.html', 'pop-in', '');
//			}
			try {
				console.log(typeof Fun_App.getdata("userInfo"))
				if(Fun_App.getdata("userInfo")!=='null' && Fun_App.getdata("userInfo")!==null && Fun_App.getdata("userInfo")!=='' ) {
					if(Fun_App.getdata("token")){
						_this.pullMessage();
					}
					_this.pageData = eval('(' + Fun_App.getdata('userInfo') + ')');
					_this.pageData.password = atob(_this.pageData.password)  
					_this.login();
				}
			} catch(e) {
				//TODO handle the exception
				console.log("本地没有账号数据" + e)
			} 

		})
	},
	methods: {
		checkVals: function(type) {
			switch(type) {
				case 'userName':
					this.checkVal.checkPhoneNum(this.pageData.userName) == false ? this.isSend = true : this.isSend = false;
					break;
				case 'password':
					this.checkVal.checkPwd(this.pageData.password) == false ? this.isSend = true : this.isSend = false;
					break;
			}
		},
		pullMessage: function() {
			// 监听点击消息事件
			plus.push.addEventListener("click", function(msg) {
				// 设置APP图标的角标
				plus.runtime.setBadgeNumber(0);
				if(msg.aps) {
					localmsg = msg.payload;
				} /*plus.runtime.setBadgeNumber(0);*/
				switch(localmsg.type) {
					case 0:
						Fun_App.openWin('page/work/messageArticle.html', 'pop-in', 500);
						break;
					case 1:
					case 2:
						var date = new Date(),
							dates;
						datas = date.getFullYear();
						datas += "-" + ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
						datas += "-" + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
						Fun_App.openWin('page/order/orderdentail.html', 'pop-in', dates);
						break;
					case 3:
						Fun_App.openWin('page/work/budgetAdmin.html', 'pop-in', '');
						break;
					case 4:
						Fun_App.openWin('page/work/partyAdmin.html', 'pop-in', '');
						break;
					default:
						console.log("推送的类型有误")
						break;
				}
				console.log("点击本地创建消息启动：");
			}, false);
			// 监听在线消息事件
			plus.push.addEventListener("receive", function(msg) {
				if(Fun_App.getdata("token") != ' ' && Fun_App.getdata("token") != null) {
					logoutPushMsg(msg);
				}
			}, false);
			// 获取穿透参数
			function logoutPushMsg(msg) {
				if(msg.payload) {
					if(typeof(msg.payload) == "string") {
						localmsg = eval('(' + msg.content + ')');
						createLocalPushMsg(localmsg);
					} else {
						localmsg = JSON.parse(msg.content);
						createLocalPushMsg(localmsg);
					}
				} else {
					console.log("payload: undefined");
				}
			}
			// 创建本地推送
			function createLocalPushMsg(content) {
				var options = {
					cover: false,
				};
				plus.push.createMessage(content.title, "LocalMSG", options);
			}
		},
		open: function() {
			Fun_App.openWin("./repwd.html", "pop-in", this.pageData.userName);
		},
		login: function() {
			var _this = this;
			var sendData = {
				config: {
					"clientId": plus.push.getClientInfo().clientid, //个推的clientId
					"deviceId": plus.device.uuid, //设备id
					"version": plus.runtime.innerVersion, //app版本
					"source": (plus.os.name == "Android") ? 1 : 2 //来源 1 Android ；2  iOS
				},
				fun_Success: function(data) {
					
					mui("#buttom").button('reset');
					if(data.success) { //登录成功
						var userInfo = {
							userName: _this.pageData.userName,
							password:btoa(_this.pageData.password)
						}
						var merchantId =btoa('merchant_portal_id:'+data.data.merchantId).replace(/==/g,'@@');
						console.log(merchantId)
						Fun_App.storagedata("userInfo", JSON.stringify(userInfo))
						Fun_App.storagedata("token", data.data.token);
						Fun_App.storagedata("phoneNumber", _this.pageData.userName );
						Fun_App.storagedata("merchantId", merchantId);// bs64编码的merchantId
						Fun_App.storagedata("merchantId2", data.data.merchantId);//没有编码的merchantid
						Fun_App.storagedata("jobCode", data.data.jobCode); //当前账户的角色等级
						Fun_App.storagedata("shopType", data.data.shopType); //当前商铺的类型
						Fun_App.storagedata("merchantType", data.data.merchantType); //存储达人的状态0 达人 1 商家
						Fun_App.openWin("index.html", "", '');
					} else {
						//Fun_App.storagedata("token", '');
						mui.toast(data.message);
					}
				}
			}
			sendData.config = Fun_App.assign(sendData.config, this.pageData);
			console.log('你还有信息没有填写'+JSON.stringify(sendData.config))
			if(Fun_App.checkObjIsNull(sendData.config, ['clientId']) != false) {
				mui("#buttom").button('loading');
				setTimeout(function() {
					mui("#buttom").button('reset');
				}.bind(this), 5000);
				Fun_App.ExAjax("login", sendData);
			} else {
				mui.toast('你还有信息没有填写!');
				console.log('你还有信息没有填写'+JSON.stringify(sendData.config))
			}

		}
	},
	watch:{
		pageData:{
			handler:function(val,oldVal){
				console.log(JSON.stringify(val))	
			},
			deep:true
		}
	}
})