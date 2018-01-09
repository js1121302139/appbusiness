var Vue = new Vue({
	el: "#applysettlement",
	data: function() {
		return {
			Card: [],
			pageData: {
				money: null, // 结算的金额
				type: null, // 结算的类型
				messageCode: null, //短信验证码
				balancePwd: null, //结算密码
				id: null,// 玩咖id
				applyId: null //结算的id
			},
			isEdit: true, // 是否可以编辑金额
			money: null, //输入的结算金额
			scalingMoney:0,// 玩咖没扣除佣金前的金额
			showOutTime: false, //显示倒计时
			second: 90, //总计时
			applyBtn: false,
			url: null,// 结算完成后的查看结算的地址
			msgType: null // 短信的类型
		}
	},
	created: function() {
		
		var _this = this;
		mui.plusReady(function() {
			var getData = Fun_App.getextrasdata(); //获取可结算的金额
			console.log(JSON.stringify(getData))
			_this.scalingMoney = getData.scalingMoney; // 玩咖没扣除佣金前的金额
			_this.pageData.money = getData.money; //取到可结算金额
			_this.pageData.type = getData.type; //结算的类型
			// 判断当前的结算类型
			if(getData.msgType == 6) {
				// 编辑框变为不可编辑的状态
				_this.isEdit = false;
				// 设置结算金额
				_this.money = getData.money;
			};
			_this.msgType = getData.msgType; //短信的类型
			_this.pageData.id = getData.id; //短信的类型
			_this.url = getData.url; //结算成功后查看详情的接口
			_this.pageData.applyId = (getData.id == undefined) ? "" : getData.id;
			setTimeout(
				_this.getCardLsit(function(resData) {
					_this.Card = resData.data;
				}), 0)
		})
	},
	methods: {
		// 请求结算
		applyDrawing: function() {
			var _this = this;
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					money: this.money,
					type: this.pageData.type,
					id: this.pageData.id,
					messageCode: this.pageData.messageCode,
					balancePwd: this.pageData.balancePwd
				},
				fun_Success: function(data) {
					mui("#cashBtn").button('reset')
					if(data.success) {
						switch(sendData.config.type) {
							case 6: // 玩咖结算
								var ws = plus.webview.getWebviewById("./partySettlement.html");
								var ws1 = plus.webview.getWebviewById("partyAdmin.html");
								mui.fire(ws, "getListData");
								mui.fire(ws1, "getPartyList");
								console.log("玩咖");
								break;
							case 1: //y营业结算
								var ws = plus.webview.getWebviewById("myincome.html");
								mui.fire(ws, "myincome")
								console.log("营业")
								break;
							case 2: //共享结算
								var ws = plus.webview.getWebviewById("shareprofit.html");
								mui.fire(ws, "shareprofit")
								console.log("共享")
								break;
						}
						mui.fire(plus.webview.currentWebview().opener(),"getListData");
						Fun_App.openWin("./cashsuccess.html", 'pop-in', {
							allMoney: _this.pageData.money, //所有金额
							money: _this.money, //结算金额
							account: _this.Card, //结算账户
							type:_this.pageData.type,
							url: _this.url //结算成功后查看详情的接口
						});
					} else {
						// 没有结算密码则跳转到设置页面
						if(data.message == "您未设置结算密码，请设置结算密码") {
							Fun_App.openWin("../account/safepay.html");
						}
						mui.toast(data.message)
					}
				}
			}
			console.log(this.pageData.type + "type")
			if(this.pageData.money > 0) {
				//判断类型是不是为6 根据短信验证码的type
				// 玩咖提现
				if(this.pageData.type == 6) {
					if(Fun_App.checkObjIsNull(sendData.config, "") != false) {
						sendData.config.scalingMoney = this.scalingMoney - this.pageData.money; // 玩咖没扣除佣金前的金额
						mui("#cashBtn").button('loading');
						// 删除type类型
						delete sendData.config.type
						sendData.scalingMoney = this.scalingMoney; // 玩咖没扣除佣金前的金额
						console.log(JSON.stringify(sendData))
						Fun_App.ExAjax('merchantParty/playKaSettleAccounts', sendData);
					} else {
						mui.toast('你还有数据没填!');  
						console.log("asdasd"+JSON.stringify(plus.webview.currentWebview().opener()))
						mui.fire(plus.webview.currentWebview().opener(),"getListData");
						Fun_App.openWin("./cashsuccess.html", 'pop-in', {
							allMoney: _this.pageData.money, //所有金额
							money: _this.money, //结算金额
							account: _this.Card, //结算账户
							type:_this.pageData.type,
							url: _this.url //结算成功后查看详情的接口
						});
					}
				} else {
					// 共享收益和营业提现
					sendData.config.id = this.pageData.applyId;
					// 删除玩咖id
					delete sendData.config.id;
					console.log(JSON.stringify(sendData))
					if(Fun_App.checkObjIsNull(sendData.config, "") != false) {
						mui("#cashBtn").button('loading');
						Fun_App.ExAjax('merchant/applyDrawing', sendData);
					} else {
						Fun_App.openWin("../account/safepay.html");
						mui.toast('你还有数据没填!');
					}
				}

			} else {
				mui.toast('你结算的金额要大于0');
			}

		},
		// 倒计时
		timeOut: function() {
			this.showOutTime = true;
			this.second--;
			if(this.second < 1) {
				this.showOutTime = false;
				this.second = 90;
			} else {
				var timeout = setTimeout(this.timeOut, 1000);
			}
		},
		// 获取短信验证码
		smsVerify: function() {
			var _this = this;
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					type: this.msgType
				},
				fun_Success: function(data) {
					mui.toast(data.message)
					if(data.data) _this.timeOut();
				}
			}
			if(this.showOutTime == false) {
				console.log(sendData.config.type+"msgId")
				Fun_App.ExAjax("merchant/smsVerify", sendData);
			}
		},
		// 获取银行卡的列表
		getCardLsit: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantPerson/allBankCard", sendData)
		},
		// 最大金额
		maxMoney: function() {
			this.money = parseFloat(this.money);
			if(this.money == 'NaN') {
				mui.toast('请输入一个数字!')
				console.log(typeof Number(this.money))
				this.money = parseInt(this.pageData.money);
			} else {
				this.money > this.pageData.money ? this.money = this.pageData.money : "";
			}
		}
	},
	filters: {
		replacex: function(value) {
			return value.replace(/\*/g, "");
		}
	}

})