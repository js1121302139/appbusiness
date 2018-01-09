var Vue = new Vue({
				el: "#applysettlement",
				data: function() {
					return {
						Card: [],
						pageData: {
							money: null,
							type: null,
							messageCode: null,
							balancePwd: null,
							id:null,
							applyId: null
						},
						money: null, //输入的结算金额
						showOutTime: false, //显示倒计时
						second: 90, //总计时
						applyBtn: false,
						url: null,
						msgType: null
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						console.log(JSON.stringify(Fun_App.getextrasdata())+"________>")
						var getData = Fun_App.getextrasdata(); //获取可结算的金额
						console.log(JSON.stringify(getData))
						_this.pageData.money = getData.money; //取到可结算金额
						_this.pageData.type = getData.type; //结算的类型
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
					applyDrawing: function() {
						var _this = this;
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								money: this.money,
								type: this.pageData.type,
								id:this.pageData.id,
								messageCode: this.pageData.messageCode,
								balancePwd: this.pageData.balancePwd
							},
							fun_Success: function(data) {
								mui("#cashBtn").button('reset')
								if(data.success) {
									switch(sendData.config.type) {
										case 6:
											var ws = plus.webview.getWebviewById("./partySettlement.html");
											var ws1 = plus.webview.getWebviewById("partyAdmin.html");
											mui.fire(ws, "getListData")
											mui.fire(ws1, "getPartyList")
											break;
										case 1:
											var ws = plus.webview.getWebviewById("myincome.html");
											mui.fire(ws, "myincome")
											break;
										case 2:
											var ws = plus.webview.getWebviewById("shareprofit.html");
											mui.fire(ws, "shareprofit")
											break;
									}
									Fun_App.openWin("./cashsuccess.html", 'pop-in', {
										allMoney: _this.pageData.money, //所有金额
										money: _this.money, //结算金额
										account: _this.Card, //结算账户
										url: _this.url //结算成功后查看详情的接口
									});
								} else {
									if(data.message == "您未设置结算密码，请设置结算密码") {
										Fun_App.openWin("../account/safepay.html");
									}
									mui.toast(data.message)
								}
							}
						}
						if(this.pageData.money > 0) {
							//判断类型是不是为6 根据短信验证码的type
							if(this.pageData.type == 6) {
								alert();
								if(Fun_App.checkObjIsNull(sendData.config, "") != false){
									mui("#cashBtn").button('loading');
									delete sendData.config.type
									console.log(JSON.stringify(sendData))
									Fun_App.ExAjax('merchant/applyDrawing', sendData); 
									Fun_App.ExAjax('merchantParty/playKaSettleAccounts', sendData);
								}else{
									mui.toast('你还有数据没填!');
								}
							} else {
								sendData.config.id = this.pageData.applyId;
								delete sendData.config.id;
								console.log(JSON.stringify(sendData))
								if(Fun_App.checkObjIsNull(sendData.config, "") != false){
									mui("#cashBtn").button('loading');
									Fun_App.ExAjax('merchant/applyDrawing', sendData); 
								}else{
									mui.toast('你还有数据没填!');
								}
							}

						} else {
							mui.toast('你结算的金额要大于0')
						}

					},
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
					smsVerify: function() {
						console.log(this.msgType)
						var _this = this;
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								type: this.msgType
							},
							fun_Success: function(data) {
								if(data.data) {
									_this.timeOut();
									mui.toast(data.message)
								} else {
									mui.toast(data.message)
								}
							}
						}
						if(this.showOutTime == false) {
							Fun_App.ExAjax("merchant/smsVerify", sendData);
						}
					},
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
					maxMoney: function() {
						/*console.log(Number(this.money)+'+++++')*/
						this.money = parseFloat(this.money);
						if(this.money=='NaN'){					
							mui.toast('请输入一个数字!')
							console.log(typeof Number(this.money))
							this.money=parseInt(this.pageData.money);
						}else{
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