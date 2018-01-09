var Vue = new Vue({
				el: "#Article",
				data: function() {
					return {
						pageData: {}
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						_this.pageData = Fun_App.getextrasdata();
						_this.pageData.status == 0 ? _this.readMessage([_this.pageData.adminMessageId]) : "";
						console.log(JSON.stringify(plus.webview.all()))
					})
				},
				methods: {
					readMessage: function(adminMessageId) {
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"adminMessageIds": adminMessageId
							},
							fun_Success: function(data) {
								if(data.success) {
									detailPage = plus.webview.getWebviewById('msgcenter.html');
									mui.fire(detailPage, "messageList");
									detailPage = plus.webview.getWebviewById('page/work/home.html');
									mui.fire(detailPage, "getindexData");
								}
							}
						}
						Fun_App.ExAjax("merchant/read", sendData);
					}

				}
			})