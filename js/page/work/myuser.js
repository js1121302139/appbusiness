<<<<<<< HEAD
var Vue = new Vue({
			el: "#myuser",
			data: function() {
				return {
					picservice: picservice,
					page: 1,
					totalPage: null,
					pageLen: pageLen,
					usercount:0,
					pageData: {},
					list: [],
					sendArr: [],
					checkAlls: false,
					isNoData:false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.getUser(function(resData) {
						console.log(JSON.stringify(resData))
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						_this.pageData = resData;
						_this.usercount=resData.data.count;
						_this.appendList(resData.data.list);
						_this.isNoData = (_this.list.length < 1) ? true : '';
					}, 1)
					refresher.init({
						id: "wrapper",
						pullDownAction: _this.Refresh,
						pullUpAction: _this.Load
					});
				})
			},
			methods: {
				getUser: function(callBack, page) {
					var sendData = {
						config: {
							"token": Fun_App.getdata("token"),
							"pageIndex": page
						},
						fun_Success: function(data) {
							callBack(data)
						}
					}
					Fun_App.ExAjax("merchantPerson/myUsers", sendData)
				},
				send: function(key) {
					console.log(JSON.stringify(this.list))
					if(key != 'null') {
						this.list[key].ischeck = true;
						var index = this.sendArr.indexOf(this.list[key].memberId);
						(index == -1) ? this.sendArr.push(this.list[key].memberId): "";
					}
					console.log(JSON.stringify(this.sendArr))
					var shopData = {
						config: {
							"token": Fun_App.getdata("token"),
							"memberIds": this.sendArr,
							"content": null
						},
						fun_Success: function(data) {
							mui("#sendBtn").button('reset');
							data.success ? mui.toast('消息发送成功') : mui.toast('消息发送失败!');
						}
					}
					if(this.sendArr.length != 0) {
						mui.prompt('', '请输入文字', '发送消息', ['取消', '确认'], function(e) {
							if(e.index) {
								var msgTxt = document.querySelector("textarea").value;
								shopData.config.content = msgTxt;
								if(msgTxt.length <= 50 && msgTxt.length > 0){
									mui("#sendBtn").button('loading');									
									Fun_App.ExAjax("merchantPerson/sendMessage", shopData);
								}else{
									mui("#sendBtn").button('loading');	
									mui.toast('请输入1-50个字符!');
								}
							}
						}, 'div')
					}else{
						mui.toast('请选择用户在进行后续操作!')
					}
				},
				Load: function() {
					this.page++;
					var _this = this;
					if(this.page <= this.totalPage) {
						this.getUser(function(resData) {
							//_this.list = _this.list.concat(resData.data);
							_this.appendList(resData.data.list);
						}, this.page)
					} else {
						refresher.info.pullUpLable = '没有更多数据了!';
					}
					wrapper.refresh();
				},
				appendList: function(val) {
					for(var i = 0; i < val.length; i++) {
						this.list.push({
							memberId: val[i].memberId,
							memberName: val[i].memberName,
							grade: val[i].grade,
							headImg: val[i].headImg,
							money: val[i].money,
							createTime: val[i].createTime,
							ischeck: false
						})
					}
				},
				checks: function(key) {
					this.list[key].ischeck = !this.list[key].ischeck;
					var index = this.sendArr.indexOf(this.list[key].memberId);
					(index == -1) ? this.sendArr.push(this.list[key].memberId): this.sendArr.splice(index, 1);
					(this.sendArr.length == this.list.length) ? this.checkAlls = !this.checkAlls: this.checkAlls = false;

				},
				checkAll: function() {
					var _this = this;
					this.checkAlls = !this.checkAlls;
					
						this.list.forEach(function(i, item) {
							i.ischeck = _this.checkAlls;
							_this.sendArr.indexOf(i.memberId)==-1?_this.sendArr.push(i.memberId):'';
						})
						if(!this.checkAlls){
							this.sendArr=[];
						}

				}

			}
		})
=======
var Vue = new Vue({
			el: "#myuser",
			data: function() {
				return {
					picservice: picservice,
					page: 1,
					totalPage: null,
					pageLen: pageLen,
					usercount:0,
					pageData: {},
					list: [],
					sendArr: [],
					checkAlls: false,
					isNoData:false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					_this.getUser(function(resData) {
						console.log(JSON.stringify(resData))
						_this.totalPage = Math.ceil(resData.total / _this.pageLen);
						_this.pageData = resData;
						_this.usercount=resData.data.count;
						_this.appendList(resData.data.list);
						_this.isNoData = (_this.list.length < 1) ? true : '';
					}, 1)
					refresher.init({
						id: "wrapper",
						pullDownAction: _this.Refresh,
						pullUpAction: _this.Load
					});
				})
			},
			methods: {
				getUser: function(callBack, page) {
					var sendData = {
						config: {
							"token": Fun_App.getdata("token"),
							"pageIndex": page
						},
						fun_Success: function(data) {
							callBack(data)
						}
					}
					Fun_App.ExAjax("merchantPerson/myUsers", sendData)
				},
				send: function(key) {
					console.log(JSON.stringify(this.list))
					if(key != 'null') {
						this.list[key].ischeck = true;
						var index = this.sendArr.indexOf(this.list[key].memberId);
						(index == -1) ? this.sendArr.push(this.list[key].memberId): "";
					}
					console.log(JSON.stringify(this.sendArr))
					var shopData = {
						config: {
							"token": Fun_App.getdata("token"),
							"memberIds": this.sendArr,
							"content": null
						},
						fun_Success: function(data) {
							mui("#sendBtn").button('reset');
							data.success ? mui.toast('消息发送成功') : mui.toast('消息发送失败!');
						}
					}
					if(this.sendArr.length != 0) {
						mui.prompt('', '请输入文字', '发送消息', ['取消', '确认'], function(e) {
							if(e.index) {
								var msgTxt = document.querySelector("textarea").value;
								shopData.config.content = msgTxt;
								if(msgTxt.length <= 50 && msgTxt.length > 0){
									mui("#sendBtn").button('loading');									
									Fun_App.ExAjax("merchantPerson/sendMessage", shopData);
								}else{
									mui("#sendBtn").button('loading');	
									mui.toast('请输入1-50个字符!');
								}
							}
						}, 'div')
					}else{
						mui.toast('请选择用户在进行后续操作!')
					}
				},
				Load: function() {
					this.page++;
					var _this = this;
					if(this.page <= this.totalPage) {
						this.getUser(function(resData) {
							//_this.list = _this.list.concat(resData.data);
							_this.appendList(resData.data.list);
						}, this.page)
					} else {
						refresher.info.pullUpLable = '没有更多数据了!';
					}
					wrapper.refresh();
				},
				appendList: function(val) {
					for(var i = 0; i < val.length; i++) {
						this.list.push({
							memberId: val[i].memberId,
							memberName: val[i].memberName,
							grade: val[i].grade,
							headImg: val[i].headImg,
							money: val[i].money,
							createTime: val[i].createTime,
							ischeck: false
						})
					}
				},
				checks: function(key) {
					this.list[key].ischeck = !this.list[key].ischeck;
					var index = this.sendArr.indexOf(this.list[key].memberId);
					(index == -1) ? this.sendArr.push(this.list[key].memberId): this.sendArr.splice(index, 1);
					(this.sendArr.length == this.list.length) ? this.checkAlls = !this.checkAlls: this.checkAlls = false;

				},
				checkAll: function() {
					var _this = this;
					this.checkAlls = !this.checkAlls;
					
						this.list.forEach(function(i, item) {
							i.ischeck = _this.checkAlls;
							_this.sendArr.indexOf(i.memberId)==-1?_this.sendArr.push(i.memberId):'';
						})
						if(!this.checkAlls){
							this.sendArr=[];
						}

				}

			}
		})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
	