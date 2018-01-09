<<<<<<< HEAD
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
=======
// 解决click300ms延迟
document.addEventListener('DOMContentLoaded', function() {
	FastClick.attach(document.body);
}, false);
var Vue = new Vue({
	el: "#safeCenter",
	data: function() {
		return {
			isShow: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			// 判断当前角色状态
			_this.isShow = (Fun_App.getdata("jobCode") == "BOSS") ? true : '';
		})
	},
	methods: {
		// 打开页面
		open: function(page) {
			Fun_App.openWin(page, 'pop-in', '')
		}
	}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
})