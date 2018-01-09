<<<<<<< HEAD
var Vue = new Vue({
	el: "#evaluatemange",
	data: function() {
		return {
			picservice: picservice,
			page: 1,
			pageLen: pageLen,
			totalPage: null,
			pageData: {},
			shopMark: 0,
			list: [],
			evatotalNum: 0,
			isNoData: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.getEvaluatemange(function(resData) {
				_this.totalPage = Math.ceil(resData.total / _this.pageLen);
				_this.pageData = resData.data;
				_this.evatotalNum = _this.pageData.totalNum;
				_this.list = resData.data.merchantComments;
				_this.shopMark = resData.data.averageGrade;
				_this.isNoData = (_this.list.length < 1) ? true : '';
			}, 1);
			refresher.init({
				id: "wrapper",
				pullUpAction: _this.Load
			});
		})
	},
	methods: {
		getEvaluatemange: function(callBack, page) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token"),
					pageIndex:page
				},
				fun_Success: function(data) {
					callBack(data);
				}
			}
			Fun_App.ExAjax("merchantPerson/comment", sendData);
		},
		Load: function() {
			this.page++;
			var _this = this;
			if(this.page <= this.totalPage) {
				this.getEvaluatemange(function(resData) {
					_this.list = _this.list.concat(resData.data.merchantComments);
				}, this.page)
			} else {
				refresher.info.pullUpLable = '没有更多数据了!';
			}

			wrapper.refresh();
		}
	},
	filters: {
		ceil: function(val) {
			return Math.ceil(val)
		}
	}
=======
var Vue = new Vue({
	el: "#evaluatemange",
	data: function() {
		return {
			picservice: picservice,
			page: 1,
			pageLen: pageLen,
			totalPage: null,
			pageData: {},
			shopMark: 0,
			list: [],
			evatotalNum: 0,
			isNoData: false
		}
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			_this.getEvaluatemange(function(resData) {
				_this.totalPage = Math.ceil(resData.total / _this.pageLen);
				_this.pageData = resData.data;
				_this.evatotalNum = _this.pageData.totalNum;
				_this.list = resData.data.merchantComments;
				_this.shopMark = resData.data.averageGrade;
				_this.isNoData = (_this.list.length < 1) ? true : '';
			}, 1);
			refresher.init({
				id: "wrapper",
				pullUpAction: _this.Load
			});
		})
	},
	methods: {
		getEvaluatemange: function(callBack, page) {
			var sendData = {
				config: {
					token: Fun_App.getdata("token")
				},
				fun_Success: function(data) {
					callBack(data);
				}
			}
			Fun_App.ExAjax("merchantPerson/comment", sendData);
		},
		Load: function() {
			this.page++;
			var _this = this;
			if(this.page <= this.totalPage) {
				this.getEvaluatemange(function(resData) {
					_this.list = _this.list.concat(resData.data.merchantComments);
				}, this.page)
			} else {
				refresher.info.pullUpLable = '没有更多数据了!';
			}

			wrapper.refresh();
		}
	},
	filters: {
		ceil: function(val) {
			return Math.ceil(val)
		}
	}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
})