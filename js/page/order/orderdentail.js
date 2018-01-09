<<<<<<< HEAD
var Vue = new Vue({
				el: "#orderdentail",
				data: function() {
					return {
						page: 1,
						totalPage: null,
						pageLen: pageLen,
						picservice: picservice,
						list: [], 
						statisTime: null,
						isNoData:true,

					}
				},
				created: function() {

					var _this = this;
					mui.plusReady(function() {
						_this.statisTime = Fun_App.getextrasdata();
						
						_this.getList(function(resData) {
							_this.list = resData.data;
							_this.isNoData = (resData.data.length<1)?true:'';		
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						}, 1)
						refresher.init({
							id: "wrapper",
							pullDownAction: _this.Refresh,
							pullUpAction: _this.Load
						});
					})
				},
				methods: {
					getList: function(callBack, page) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								statisTime: this.statisTime,
								pageIndex: page
							},
							fun_Success: function(data) {
								callBack(data)
							} 
						}
						Fun_App.ExAjax("merchantOrders/detailInfo", sendData)
					},
					Load: function() {
						var _this = this;
						this.page++;
						if(this.page <= this.totalPage) {
							this.getList(function(resData) {
								_this.list = _this.list.concat(resData.data)
							}, this.page)
						} else {
							refresher.info.pullUpLable = '没有更多数据了!';
						}
						wrapper.refresh();
					}
				}

			})
=======
var Vue = new Vue({
				el: "#orderdentail",
				data: function() {
					return {
						page: 1,
						totalPage: null,
						pageLen: pageLen,
						picservice: picservice,
						list: [],
						statisTime: null,
						isNoData:true,

					}
				},
				created: function() {

					var _this = this;
					mui.plusReady(function() {
						_this.statisTime = Fun_App.getextrasdata();
						_this.getList(function(resData) {
							_this.list = resData.data;
							_this.isNoData = (resData.data.length<1)?true:'';		
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						}, 1)
						refresher.init({
							id: "wrapper",
							pullDownAction: _this.Refresh,
							pullUpAction: _this.Load
						});
					})
				},
				methods: {
					getList: function(callBack, page) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								statisTime: this.statisTime,
								pageIndex: page
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantOrders/detailInfo", sendData)
					},
					Load: function() {
						var _this = this;
						this.page++;
						if(this.page <= this.totalPage) {
							this.getList(function(resData) {
								_this.list = _this.list.concat(resData.data)
							}, this.page)
						} else {
							refresher.info.pullUpLable = '没有更多数据了!';
						}

						wrapper.refresh();
					}
				}

			})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
		