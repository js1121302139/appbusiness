var Vue = new Vue({
	el: "#myorder",
	data: function() {
		return {
			page: 1,
			totalPage: null,
			pageLen: pageLen,
			pageTop: {},
			list: [],
			isNoData: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.myOrderList(function(resData) {
				_this.list = resData.data;
				_this.totalPage = Math.ceil(resData.total / _this.pageLen);
				_this.isNoData = (_this.list.length < 1) ? true : '';
			}, 1)
			_this.getMyOrderTop(function(resData) {
				_this.pageTop = resData.data;
			})
			_this.todayOrdersStatistics(function(resdata) {
				if(resdata.data != null) {
					_this.list.unshift(resdata.data)
					// 当前列表是否有数据
					_this.isNoData = (_this.list.length < 1) ? true : '';
				}
			})
			refresher.init({
				id: "wrapper",
				pullDownAction: _this.Refresh,
				pullUpAction: _this.Load
			});
		})
	},
	methods: {
		getMyOrderTop: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantOrders/statistics", sendData)
		},
		myOrderList: function(callBack, page) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					pageIndex: page
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			console.log(Fun_App.getdata("token") + "     Fun_App.getdata(token)")
			Fun_App.ExAjax("merchantOrders/moreStatistics", sendData)
		},
		todayOrdersStatistics: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantOrders/todayOrdersStatistics", sendData)
		},
		Load: function() {
			this.page++;
			var _this = this;
			if(this.page <= this.totalPage) {
				this.myOrderList(function(resdata) {
					_this.list = _this.list.concat(resdata.data);
				}, this.page)
			} else {
				refresher.info.pullUpLable = '没有更多数据了!';
			}
			wrapper.refresh();
		},
		Refresh: function() {
			var _this = this;
			setTimeout(function() {
				_this.getMyOrderTop(function(resData) {
					_this.pageTop = resData.data;
				})
			}, 0)
			setTimeout(function() {
				_this.todayOrdersStatistics(function(resdata) {
					if(resdata.data != null) {
						_this.list.splice(0, 1);
						_this.list.unshift(resdata.data)
					}
				})
			}, 0)

		},
		showPopup: function(showData) {
			var alertStr =
				'<div class=""><p>订单数</p><p>' + showData.orderNum + '</p></div>' +
				'<div class=""><p>订单总额</p><p>' + showData.moneyTotal + '</p></div>' +
				'<div class=""><p>现金券抵扣</p><p>' + showData.integral + '</p></div>' +
				'<div class=""><p>佣金扣除</p><p>' + showData.scalingAmount + '</p></div>' +
				'<div class=""><p>营业收入</p><p>' + showData.actualIncome + '</p></div>';
			mui.alert(alertStr, '', '知道了', function(e) {
				e.index
			}, 'div')
		},
		detailInfo: function(statisTime) {
			mui.plusReady(function() {
				Fun_App.openWin("./orderdentail.html", 'pop-in', statisTime);
			})
		}
	},
	filters: {
		cutTime: function(timer) {
			try{
				var str = timer.split(" ")[0];
				return str;
			}catch(e){
				//TODO handle the exception
				console.log(e)
			}
			
		}
	}
})