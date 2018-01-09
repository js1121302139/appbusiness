document.addEventListener('DOMContentLoaded', function() {
	FastClick.attach(document.body);
}, false);
var Vue = new Vue({
	el: "#myuser",
	data: function() {
		return {
			pageData: null,
			// 导航条的数据
			sonignBar: [{
				tit: "未领取",
				status: 1,
				state: true
			}, {
				tit: "已领取",
				status: 2,
				state: false
			}, {
				tit: "已过期",
				status: 3,
				state: false
			}],
			// 默认的请求参数
			navItem: 1,
			// 页面显示的数据大小
			pageSize: pageLen,
			// 页码
			pageNo: 0,
			// 没有数据的提示
			noDataTip: "",
			// 加载数据后是否还有后续数据
			isEndList: false,
			// 没有数据的覆盖层
			isNoData: false,
			wrappers: {
				wrapper: null,
				wrapper2: null,
				wrapper3: null,

			}
		}
	},
	created: function() {
		var _this = this;

		mui.plusReady(function() {
			console.log(Fun_App.getdata("token"))
			_this.getLsit(function(resData) {
				_this.pageData = resData.data.list;
				_this.isNoData = _this.pageData.length == 0;
			});
			window.addEventListener("storeList", function() {
				_this.getLsit(function(resData) {
					_this.pageData = resData.data.list;
				});
			})
			refresher.init({
				id: "wrapper",
				pullDownAction: _this.Refresh,
				pullUpAction: _this.Load
			});
		})
	},
	methods: {
		// 获取列表
		getLsit: function(callBack) {
			var _this = this;
			var sendData = {
				config: {
					merToken: Fun_App.getdata("token"),
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"status": this.navItem
				},
				fun_Success: function(data) {
					mui.toast(data.message);
					if(data.retCode !== 0) return false;
					console.log(JSON.stringify(data));
					// 返回的数据大小 < 页面显示数据的大小
					_this.isEndList = data.data.list.length < _this.pageSize;
					// 回调
					callBack(data);
				}
			}
			console.log(JSON.stringify(sendData.config));
			Fun_App.ExEncryptionAjax("order-service/merchant/order/myrepo", sendData, "", "get", "merchant_query")
		},
		// 改变导航栏的状态并加载相应的数据
		changeClass: function(item) {
			refresher.info.pullUpLable = '上拉加载更多!';
			for(var i = 0; i < this.sonignBar.length; i++) {
				this.sonignBar[i].state = false;
			}
			item.state = true;
			this.navItem = item.status;
			wrapper.refresh();
			this.getLsit(function(resData) {
				console.log("this.navItem" + JSON.stringify(resData))
				this.pageData = resData.data.list;
				console.log(JSON.stringify(this.pageData) + " +++pageData")
				this.isNoData = this.pageData.length == 0;
			}.bind(this));
		},
		openWin: function(url, data) {
			Fun_App.openWin(url, "pop-in", data);
		},
		// 上拉加载
		Load: function() {
			// 没有后续数据时
			if(this.isEndList) {
				wrapper.refresh();
				refresher.info.pullUpLable = '没有更多数据了!';
				return false
			};
			// 页码加一
			this.pageNo++;
			this.getLsit(function(resData) {
				this.pageData = this.pageData.concat(resData.data.list);
				_this.isNoData = _this.pageData.length == 0;
			}.bind(this));
			wrapper.refresh();
		}
	},
	filters: {
		// 获取数据的个数
		lenG: function(val) {
			return eval(val).length;
		}
	}
})