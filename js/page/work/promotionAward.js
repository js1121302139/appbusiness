var Vue = new Vue({
	el: "#promotionAward",
	data: function() {
		return {
			page: 1,
			totalPage: null,
			isWithdraw: false,
			pageData: {},
			list: []
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			refresher.init({
				id: "wrapper",
				pullUpAction: _this.Load
			});
			_this.getPromotionAward(function(resData) {
				_this.pageData = resData;
				_this.totalPage = resData.total;
				_this.list = resData.data.merchantExtendLogs;
			}, 1)
			_this.getisWithdraw(function(resData) {
				_this.isWithdraw = resData.data;
			})
		})
	},
	methods: {
		getPromotionAward: function(callBack, page) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					pageIndex: page
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantExtend/info", sendData)
		},
		getisWithdraw: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantExtend/isWithdraw", sendData)
		},
		open: function(pageClass) {
			var win = {
					dentail: {
						url: './jsdentail.html',
						transmitData: 'merchantBalance/withdrawInfo'
					},
					applysettlement: {
						url: './applysettlement.html',
						transmitData: {
							api: 'getTransfersToken',
							data: this.pageData.extendBalance
						}
					}
				},
				_this = this;
			mui.plusReady(function() {
				if(_this.isWithdraw) {
					alert()
				} else {
					Fun_App.openWin(win[pageClass].url, 'pop-in', win[pageClass].transmitData);
				}
			})
		},
		Load: function() {
			this.page++;
			var _this = this;
			/*if(this.page >this.totalPage) {*/
			this.getPromotionAward(function(resData) {
				_this.list = _this.list.concat(resData.data.merchantExtendLogs)
			}, this.page)
			/*} else {
				mui.toast('没有更多数据了!')
			}*/
			wrapper.refresh();
		}
	}
})