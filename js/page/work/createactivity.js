<<<<<<< HEAD
	var Vue = new Vue({
			el: "#created",
			data: function() {
				return {
					activity: {
						"token": Fun_App.getdata("token"),
						"activityName": null, //活动名称
						"activityDate": null,
						"discount": null, //折扣
						"consumeTop": null, //消费封顶
						"remark": null, //备注 
						"roomNum": null //预留房间数
					},
					pageData: {},
					shopType: null,//是否显示参与房间
					isShow:false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					var dateTime = new Date();
					_this.activity.activityDate = dateTime.getFullYear() + "-" + ((dateTime.getMonth() + 1) <= 9 ? '0' + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1)) + "-" + ((dateTime.getDate()) <= 9 ? '0' + (dateTime.getDate()) : (dateTime.getDate()));
					_this.shopType = Fun_App.getdata("shopType");
					console.log(_this.shopType)
					if(_this.shopType != 'null') { 
						_this.isShow = true
					}else{
						delete _this.activity.roomNum;
					}
					_this.activeityRule(function(resData) {
						_this.pageData = resData.data;
					})
				})
			},
			methods: {
				optionDate: function(option) {
					var picker = new mui.DtPicker({
							type: "date"
						}),
						_this = this;
					picker.show(function(rs) {
						_this.activity.activityDate = rs.text;
						picker.dispose();
					});

				},
				createActive: function() {
					var sendData = {
						config: this.activity,
						fun_Success: function(data) {
							if(data.success) {
								mui.alert('活动创建成功', '提示', '确定', function(e) {
									detailPage = plus.webview.getWebviewById('activityCenter.html');
									mui.fire(detailPage, "selfBuildActivity")
								}, 'div')
							}
						}
					}
					if(Fun_App.checkObjIsNull(this.activity, "") != false) {
						Fun_App.ExAjax("merchantActivity/create", sendData)
					} else {
						mui.toast('你还有东西没填哦!')
						console.log(JSON.stringify(this.activity))
					}

				},
				activeityRule: function(callBack) {
					var sendData = {
						config: {
							"token": Fun_App.getdata("token")
						},
						fun_Success: function(data) {
							callBack(data)
						}
					}
					Fun_App.ExAjax("merchantActivity/rule", sendData)
				}

			}
		})
=======
	var Vue = new Vue({
			el: "#created",
			data: function() {
				return {
					activity: {
						"token": Fun_App.getdata("token"),
						"activityName": null, //活动名称
						"activityDate": null,
						"discount": null, //折扣
						"consumeTop": null, //消费封顶
						"remark": null, //备注 
						"roomNum": null //预留房间数
					},
					pageData: {},
					shopType: null,//是否显示参与房间
					isShow:false
				}
			},
			created: function() {
				var _this = this;
				mui.plusReady(function() {
					var dateTime = new Date();
					_this.activity.activityDate = dateTime.getFullYear() + "-" + ((dateTime.getMonth() + 1) <= 9 ? '0' + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1)) + "-" + ((dateTime.getDate()) <= 9 ? '0' + (dateTime.getDate()) : (dateTime.getDate()));
					_this.shopType = Fun_App.getdata("shopType");
					console.log(_this.shopType)
					if(_this.shopType != 'null') { 
						_this.isShow = true
					}else{
						delete _this.activity.roomNum;
					}
					_this.activeityRule(function(resData) {
						_this.pageData = resData.data;
					})
				})
			},
			methods: {
				optionDate: function(option) {
					var picker = new mui.DtPicker({
							type: "date"
						}),
						_this = this;
					picker.show(function(rs) {
						_this.activity.activityDate = rs.text;
						picker.dispose();
					});

				},
				createActive: function() {
					var sendData = {
						config: this.activity,
						fun_Success: function(data) {
							if(data.success) {
								mui.alert('活动创建成功', '提示', '确定', function(e) {
									detailPage = plus.webview.getWebviewById('activityCenter.html');
									mui.fire(detailPage, "selfBuildActivity")
								}, 'div')
							}
						}
					}
					if(Fun_App.checkObjIsNull(this.activity, "") != false) {
						Fun_App.ExAjax("merchantActivity/create", sendData)
					} else {
						mui.toast('你还有东西没填哦!')
						console.log(JSON.stringify(this.activity))
					}

				},
				activeityRule: function(callBack) {
					var sendData = {
						config: {
							"token": Fun_App.getdata("token")
						},
						fun_Success: function(data) {
							callBack(data)
						}
					}
					Fun_App.ExAjax("merchantActivity/rule", sendData)
				}

			}
		})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
	