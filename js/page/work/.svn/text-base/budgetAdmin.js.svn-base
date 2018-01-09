var Vue = new Vue({
				el: "#budgetAdmin",
				data: function() {
					return {
						totalPage: null,
						picservice: picservice, //图片地址
						status: { //状态码
							'0': "未使用",
							'1': '已使用'
						},
						isNoData:false,
						pageLen: pageLen,
						page: 1,
						totalPage: null,
						pageData: {},
						list: [] //列表数据
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						_this.getBooked(function(bookedData) {
							_this.pageData = bookedData.data;
							_this.totalPage = Math.ceil(bookedData.data.orderCount / _this.pageLen)
						});
						_this.getBookedLsit(function(resData) {
							_this.list = resData.data;
							_this.isNoData = (_this.list.length < 1) ? true : '';
						}, 1);
						refresher.init({
							id: "wrapper",
							pullUpAction: _this.Load
						});
					})
				},
				methods: {
					getBooked: function(callBack) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token")
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantOrders/booked", sendData)
					},
					getBookedLsit: function(callBack, page) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								pageIndex: this.page
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantOrders/moreBooked", sendData)
					},
					Load: function() {
						this.page++;
						var _this = this;
						if(this.page <= this.totalPage) {
							this.getBookedLsit(function(resData) {
								_this.list = _this.list.concat(resData.data);
							}, this.page)
						} else {
							refresher.info.pullUpLable = '没有更多数据了!';
						}

						wrapper.refresh();
					}
				}
			})