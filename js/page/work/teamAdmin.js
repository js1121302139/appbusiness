var Vue = new Vue({
	el: "#teamAdmin",
	data: function() {
		return {
			pageData: null,
			picservice: picservice,
			shopLogo: null,
			isNoData: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			// 获取shopLogo
			var shopLogo = Fun_App.getdata("shopLogo");
			_this.shopLogo = (shopLogo == null || shopLogo == "") ? '../../img/work-head.png' : shopLogo;
			_this.getTeamList(function(resData) {
				_this.pageData = resData.data;
				_this.isNoData = (resData.data.length < 1) ? true : false;
			})
			window.addEventListener('getTeamList', function() {
				_this.getTeamList(function(resData) {
					_this.pageData = resData.data;
					_this.isNoData = (resData.data.length < 1) ? true : false;
				});
			});
		})
	},
	methods: {
		getTeamList: function(callBack) {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantAccount/list", sendData)
		},
		open: function(id) {
			Fun_App.openWin("addSonAccount.html", "pop-in", id)
		},
		updateState: function(key) {
			var _this = this;
			// 	2 禁用 1 启用
			_this.pageData[key].state = (_this.pageData[key].state == 2 ? 1 : 2);
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"id": this.pageData[key].id,
					"state": this.pageData[key].state
				},
				fun_Success: function(data) {
					mui.toast(data.message)
					if(!data.success) {
						_this.getTeamList(function(resData) {
							_this.pageData = resData.data;
							_this.isNoData = (resData.data.length < 1) ? true : false;
						})
					}
				}
			}
			mui.plusReady(function() {
				Fun_App.ExAjax("merchantAccount/updateState", sendData)
			})
		}
	}
})