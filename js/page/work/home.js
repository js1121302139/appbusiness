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
				isMaster: false, // 是否是达人
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
			_this.showBox.isMaster = (Fun_App.getdata("merchantType") != 0) ? true : false;
			Fun_App.pulldownRefresh();
			console.log(Fun_App.getdata("merchantId"))
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
					Fun_App.storagedata("shopLogo", _this.shopLogo);
					Fun_App.storagedata("shopName", resData.merchantName); //当前商铺的名称
					// 将商户信息存储在变量里
					var merchantInfo = JSON.stringify({
						merchantAddress: resData.merchantAddress,
						merchantLogo: resData.logoImg,
						merchantName: resData.merchantName
					})
					Fun_App.storagedata('merchantInfo', merchantInfo)
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
					if(data) {

					}
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
		open: function(pageurl, sendData) {
			Fun_App.openWin(pageurl + '.html', "pop-in", sendData);
		},
		createView: function(view) {
			var merchantInfo = eval('(' + Fun_App.getdata('merchantInfo') + ')')
			var token = Fun_App.getdata('token'),
				merchantId = encodeURI(Fun_App.getdata('merchantId2')),
				mchName = encodeURI(encodeURI(merchantInfo.merchantName)),
				logoImg = encodeURI(merchantInfo.merchantLogo),
				mchAddr = encodeURI(encodeURI(merchantInfo.merchantAddress));
				var url = '?token='+token+'&merchantId='+merchantId+'&mchName='+mchName+'&mchAddr='+mchAddr+'&logoImg='+picservice+logoImg;
				if(!plus.webview.getWebviewById('tkb')) {
					plus.webview.create('http://h5.duikavip.com/'+view + url, 'tkb');
				}
				plus.webview.getWebviewById('tkb').show();

		}
	}
})