var Vue = new Vue({
			el: "#myincome",
			data: function() {
				return {
					page: 1,
					pageLen: pageLen,
					totalPage: null,
					topInfo: {},
					incomeList: [],
					isShowApplyBtn: false,
					isNoData:false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					//判断当前角色的状态是不是Boos
					_this.isShowApplyBtn = (Fun_App.getdata("jobCode") != "BOSS") ? false : true;
					window.addEventListener("myincome", function() {
						_this.getMyIncome(function(infoData) { //顶部收入
							console.log(Fun_App.getdata("token"))
							_this.topInfo = infoData.data;

						})
						_this.getMyIncomeList(function(resData) { //列表数据
							_this.incomeList = resData.data;
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
							_this.isNoData = (_this.incomeList.length < 1) ? true : false;
						}, 1)
					})
					_this.getMyIncome(function(infoData) { //顶部收入
						console.log(Fun_App.getdata("token"))
						_this.topInfo = infoData.data;
					})
					_this.getMyIncomeList(function(resData) { //列表数据
						_this.incomeList = resData.data;
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						_this.isNoData = (_this.incomeList.length < 1) ? true : false;
						console.log(JSON.stringify(_this.incomeList))
					}, 1)
					refresher.init({
						id: "wrapper",
						pullDownAction: _this.Refresh,
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
					Fun_App.ExAjax("merchantBalance/info", sendData);
				},
				getMyIncomeList: function(callBack, page) {
					var sendData = {
						config: {
							token: Fun_App.getdata("token"),
							pageIndex: page
						},
						fun_Success: function(data) {
							callBack(data);
						}
					}
					Fun_App.ExAjax("merchantBalance/moreInfo", sendData);
				},
				Load: function() {
					var _this = this;
					this.page++;
					if(this.page <= this.totalPage) {
						this.getMyIncomeList(function(infoData) {
							_this.incomeList = _this.incomeList.concat(infoData.data)
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
							transmitData: 'merchantBalance/withdrawInfo'
						},
						applysettlement: {
							url: './applysettlement.html',
							transmitData: {
								type: 1,
								money: this.topInfo.balance,
								msgType: 4,
								url: 'merchantBalance/withdrawInfo'
							}
						}
					}
					mui.plusReady(function() {
						Fun_App.openWin(win[pageClass].url, 'pop-in', win[pageClass].transmitData);
					})
				}
			}
		})
	