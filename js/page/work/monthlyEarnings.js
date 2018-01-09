var Vue = new Vue({
	el: "#monthlyEarnings",
	data: function() {
		return {
			page: 1,
			totalPage: null,
			pageLen: pageLen,
			pageData: {},
			mouth: new Date().getMonth() + 1,
			list: [],
			showMouth: false,
			isNoData: false
		}
	},
	created: function() {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});

		var _this = this;
		mui.plusReady(function() {
			_this.getIncomeMonth(function(resData) {
				_this.totalPage = Math.ceil(resData.total / _this.pageLen);
				_this.pageData = resData.data;
				_this.list = resData.data.merchantShareLogsList;
				_this.isNoData = (_this.list.length < 1) ? true : '';
			}, 1, null)
			refresher.init({
				id: "wrapper",
				pullUpAction: _this.Load
			});
		})
	},
	methods: {
		getIncomeMonth: function(callBack, page, mouth) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					pageIndex: page,
					month: mouth
				},
				fun_Success: function(data) {
					callBack(data);
				}
			}
			Fun_App.ExAjax("merchantShare/incomeMonth", sendData);
		},
		Load: function() {
			this.page++;
			var _this = this;
			if(this.page <= this.totalPage) {
				this.getIncomeMonth(function(resData) {
					_this.list = _this.list.concat(resData.data.merchantShareLogsList);
				}, this.page, this.mouth)
			} else {
				refresher.info.pullUpLable = '没有更多数据了!';
			}
			wrapper.refresh();
		},
		changeMouth: function(mouth) {
			this.showMouth = !this.showMouth;
			this.mouth = mouth;
			var _this = this;
			this.getIncomeMonth(function(resData) {
				_this.totalPage = resData.total / _this.pageLen;
				_this.pageData = resData.data;
				_this.list = resData.data.merchantShareLogsList;
				_this.isNoData = (_this.list.length < 1) ? true : '';
			}, 1, mouth)
		}
	}
})