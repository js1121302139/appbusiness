document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
		var Vue = new Vue({
			el: '#home',
			data: function() {
				return {
					pageData: {
						"token": null,
						"deviceId": null,
						"merchantId": null,
						"source": null,
						"todayOrderTotalMoney": 0,
						"todayOrders": 0,
						"todayShareIncome": 0,
						"merchantName": "",
						"merchantAddress": "",
						"receiptCode": null,
						"logoImg": "",
						"messageNum": 0
					},
					picservice: picservice,
					shopLogo: "../../img/work-head.png",
					showBox: {
						isBOOS: false, // 是否是老板
						isMsg: false, // 有沒有消息
						isF2c: false, // 有沒有f2c日
						isShopType: false // 是否是酒店
					}
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.showBox.isShopType = (Fun_App.getdata("shopType") !== 'null') ? true : false;
					_this.showBox.isBOOS = (Fun_App.getdata("jobCode") == 'BOSS') ? true : false;
					Fun_App.pulldownRefresh();
					window.addEventListener("getindexData", function() {
						setTimeout(function() {
							_this.getHome(function(resData) {
								_this.shopLogo = _this.picservice + resData.logoImg;
								_this.showBox.isMsg = resData.messageNum;
								_this.pageData = resData;
							})
							_this.gettodayActivity(function(resData) {
								_this.pageData.today = resData.today;
								_this.showBox.isF2c = resData.isActivityDate;
							})
						}, 0)
					})
					setTimeout(function() {
						_this.getHome(function(resData) {
							_this.shopLogo = _this.picservice + resData.logoImg;
							//存储店铺logo
							Fun_App.storagedata("shopLogo",_this.shopLogo);
							_this.showBox.isMsg = resData.messageNum;
							_this.pageData = resData;
						})
						_this.gettodayActivity(function(resData) {
							_this.pageData.today = resData.today;
							_this.showBox.isF2c = resData.isActivityDate
						})
					}, 0)

				})
			},
			methods: {
				getHome: function(callBack) {
					var _this = this;
					var senddata = {
						config: {
							"token": Fun_App.getdata("token")
						},
						fun_Success: function(data) {
							callBack(data.data)
						}
					}
					Fun_App.ExAjax("merchant/index", senddata);
				},
				gettodayActivity: function(callBack) {
					var senddata = {
						config: {
							"token": Fun_App.getdata("token")
						},
						fun_Success: function(data) {
							callBack(data.data);
						}
					}
					Fun_App.ExAjax("merchantActivity/todayActivity", senddata);
				},
				open: function(pageurl,sendData) {
					Fun_App.openWin(pageurl + '.html', "pop-in", sendData);
				}
			}
		})