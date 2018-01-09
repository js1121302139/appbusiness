var Vue = new Vue({
			el: "#jsdentail",
			data: function() {
				return {
					requestUrl: '',
					page: 1,
					totalPage: null,
					pageLen: pageLen,
					list: [],
					dentailState: {
						1: '审核中',
						2: '审核通过',
						3: '已打款',
						5: '审核失败',
						null: '已打款'
					},
					isNoData: false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.requestUrl = Fun_App.getextrasdata();
					_this.getJsDentail(function(resData) {
						_this.list = resData.data;
						_this.isNoData = (resData.data.length < 1) ? true : '';
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
					}, 1)
					refresher.init({
						id: "wrapper",
						/*pullDownAction: Refresh,*/
						pullUpAction: _this.Load
					});
					plus.webview.close("./cashsuccess.html","slide-out-right",250);
				})
			},
			methods: {
				getJsDentail: function(callBack, page) {
					var sendData = {
						config: {
							token: Fun_App.getdata("token"),
							pageIndex: page
						},
						fun_Success: function(data) {
							callBack(data);
						}
					}
					Fun_App.ExAjax(this.requestUrl, sendData);
				},
				Load: function() {
					this.page++;
					var _this = this;
					if(this.page <= this.totalPage) {
						this.getJsDentail(function(resData) {
							_this.list = _this.list.concat(resData.data);
						}, this.page)
					} else {
						refresher.info.pullUpLable = '没有更多数据了!';
					}
					wrapper.refresh();
				}
			}
		})