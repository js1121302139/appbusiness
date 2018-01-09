// 解决click300ms延迟
document.addEventListener('DOMContentLoaded', function() {
	FastClick.attach(document.body);
}, false);
var Vue = new Vue({
	el: "#safeCenter",
	data: function() {
		return {
			isShow: false,
			isMaster:false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			// 判断当前角色状态
			_this.isShow = (Fun_App.getdata("jobCode") == "BOSS") ? true : '';
			_this.isMaster = (Fun_App.getdata("merchantType") != 0) ? false : true;
		})
	},
	methods: {
		// 打开页面
		open: function(page) {
			Fun_App.openWin(page, 'pop-in', '')
		}
	}
})