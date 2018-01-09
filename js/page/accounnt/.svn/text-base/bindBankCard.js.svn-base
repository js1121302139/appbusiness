var Vue = new Vue({
	el: "#bankCardList",
	data: function() {
		return {
			pageData: {}, // 页面的数据
			showBtn: false // 是否显示按钮
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.getCardLsit(function(resData) {
				_this.pageData = resData;
				if(resData.data.length == 0) {
					_this.showBtn = true;
				}
			});
		})
	},
	methods: {
		// 获取银行卡列表
		getCardLsit: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					// 回调
					callBack(data)
				}
			}
			Fun_App.ExAjax("merchantPerson/allBankCard", sendData)
		},
		// 页面
		open: function(id) {
			mui.plusReady(function() {
				Fun_App.openWin("./addBankCard.html", "pop-in", id)
			})
		}
	},
	computed: {

	},
	filters: {
		bankCode: function(val) {
			return val.substring(val.length - 4);
		}
	}

})