var Vue = new Vue({
			el: "#shareprofit",
			data: function() {
				return {
					totalPage: null,
					page: 1,
					pageLen: pageLen,
					pageList: [],
					shareBalanceMoney: 0,
					isShowApplyBtn: false,
					pageData: {},
					list: [],
					isNoData: false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.isShowApplyBtn = (Fun_App.getdata("jobCode") != "BOSS") ? false : true;
					console.log(_this.isShowApplyBtn)
					//刷新页面数据
					window.addEventListener("shareprofit", function() {
						_this.getMyIncome(function(resData) {
							_this.pageData = resData.data;

							_this.shareBalanceMoney = (_this.pageData.shareMoney - _this.pageData.shareBalance).toFixed(2);
						});
						_this.getMoreInfo(function(resData) {
							_this.list = resData.data
							_this.isNoData = (_this.list.length < 1) ? true : '';
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						}, 1)
					})

					_this.getMyIncome(function(resData) {
						_this.pageData = resData.data;
						_this.shareBalanceMoney = (_this.pageData.shareMoney - _this.pageData.shareBalance).toFixed(2);
					});
					_this.getMoreInfo(function(resData) {
						_this.list = resData.data
							_this.isNoData = (_this.list.length < 1) ? true : '';
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
					}, 1)
					refresher.init({
						id: "wrapper",
						pullUpAction: _this.Load
					});
				})
			},
			methods: {
				getMyIncome: function(callBack) {
					var sendData = {
						config: {
							token: Fun_App.getdata("token")
						},
						fun_Success: function(data) {
							callBack(data);
						}
					}
					Fun_App.ExAjax("merchantShare/info", sendData);
				},
				getMoreInfo: function(callBack, page) {
					var sendData = {
						config: {
							token: Fun_App.getdata("token"),
							pageIndex: page
						},
						fun_Success: function(data) {
							callBack(data);
						}
					}
					Fun_App.ExAjax("merchantShare/moreInfo", sendData);
				},
				Load: function() {
					this.page++;
					var _this = this;
					if(this.page <= this.totalPage) {
						this.getMoreInfo(function(infoData) {
							_this.list = _this.list.concat(infoData.data);
						}, this.page);
					} else {
						refresher.info.pullUpLable = '没有更多数据了!';
					}

					wrapper.refresh();
				},
				open: function(pageClass) {
					var win = {
						dentail: {
							url: './jsdentail.html',
							transmitData: 'merchantShare/withdrawInfo'
						},
						applysettlement: {
							url: './applysettlement.html',
							transmitData: {
								type: 2,
								money: this.pageData.shareBalance,
								msgType: 3,
								url: 'merchantShare/withdrawInfo'
							}
						},
						everyMouth: {
							url: './monthlyEarnings.html',
							transmitData: ''
						}
					}
					mui.plusReady(function() {
						Fun_App.openWin(win[pageClass].url, 'pop-in', win[pageClass].transmitData);
					})
				}
			}
		})
	