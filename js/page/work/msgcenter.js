var Vue = new Vue({
			el: "#message",
			data: function() {
				return {
					list: [],
					picservice: picservice,
					page: 1, 
					totalPage: null,
					pageLen: pageLen,
					isNoData:false
				} 
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					refresher.init({
						id: "wrapper",
						pullUpAction: _this.Load 
					});
					_this.messageList(function(resData) {
						_this.list = resData.data;
						(resData.total<1)?_this.isNoData=true:_this.isNoData=false;
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
					}, 1)
					window.addEventListener("messageList", function() {
						_this.messageList(function(resData) {
							_this.list = resData.data;
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						}, 1)
					})
				})
			},
			methods: {
				messageList: function(callBack, page) {
					var sendData = {
						config: {
							"token": Fun_App.getdata("token"),
							'pageIndex': page
						},
						fun_Success: function(data) {
							var datas = data;
							callBack(datas);
						}
					}
					Fun_App.ExAjax("merchant/message", sendData);
				},
				open: function(data) {
					mui.plusReady(function() {
						Fun_App.openWin('./messageArticle.html', "pop-in", data);
					})
				},
				// 读消息
				read: function() {
					var mseeageId = []
					for(var i = 0; i < this.list.length; i++) {
						if(this.list[i].status == 0) {
							mseeageId.push(this.list[i].adminMessageId)
							this.list[i].status = 1;
						}
					}
					var sendData = {
						config: {
							"token": Fun_App.getdata("token"),
							"adminMessageIds": mseeageId
						},
						fun_Success: function(data) {
							if(data.success == true) {
								detailPage = plus.webview.getWebviewById('page/work/home.html');
								mui.fire(detailPage, "getindexData");
							};
						}
					}
					mseeageId.length>=1?Fun_App.ExAjax("merchant/read", sendData):mui.toast('你还没有可读的消息！');
					
				},
				Load: function() {
					this.page++;
					var _this = this;
					if(this.page <= this.totalPage) {
						this.messageList(function(resData) {
							_this.list = _this.list.concat(resData.data);
						}, this.page)
					} else {
						refresher.info.pullUpLable = '没有更多数据了!';
					}
					wrapper.refresh();
				}
			}

		})
	