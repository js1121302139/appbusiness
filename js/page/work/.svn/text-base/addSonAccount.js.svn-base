var Vue = new Vue({
				el: "#addSonAccount",
				data: function() {
					return {
						getObj: null, //获取编辑的数据
						isEdit: false,
						isShowGroup: false,
						check: new CheckValue(),
						isSend: false, //当前状态是否可以发送请求
						pageData: {
							"token": Fun_App.getdata("token"),
							"id": null,
							"name": null, //姓名
							"phone": null, //手机号
							"groupId": null, //团队ID
							"jobId": null, //角色id
							"jobName": '请选择', //角色名字
							"groupName": '请选择', //下面会做delete
							'messageCode': null
						},
						job: null,
						jobs: [], // 角色
						group: null,
						groups: [], // 团队
						showOutTime: false, //显示倒计时
						second: 90,
						isSuccess: false //是否成功显示成功提示
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						_this.getObj = Fun_App.getextrasdata();
						console.log(JSON.stringify(_this.getObj)); 
						var JobAndGroupdata = _this.getJobAndGroupData();
						if(_this.getObj == 'add') { //判断当前的状态是不是添加
							_this.isEdit = true;
							// 删除id
							delete _this.pageData.id
						} else {
							_this.isEdit = false;
							// 编辑删除短信验证码
							delete _this.pageData.messageCode
						};
						// 当前状态时编辑的时候
						if(!_this.isEdit) {
							_this.pageData.name = _this.getObj.name;
							_this.pageData.id = _this.getObj.id;
							_this.pageData.phone = _this.getObj.phone;
							_this.pageData.jobId = _this.getObj.jobId;
							// 显示角色为员工的团队
							for(var i =0;i<JobAndGroupdata.group.length;i++){
								if(_this.getObj.groupId == JobAndGroupdata.group[i].groupId)_this.pageData.groupName = JobAndGroupdata.group[i].name;
							}
							_this.pageData.jobId != 2 ? _this.isShowGroup = true : ""; //是否显示团队
							_this.pageData.jobName = _this.getObj.jobName;
						}
						_this.job = new mui.PopPicker();
						for(var i = 0; i < JobAndGroupdata.job.length; i++) {
							_this.jobs.push({
								'jobId': JobAndGroupdata.job[i].jobId,
								'text': JobAndGroupdata.job[i].jobName
							})
						}
						//如果当前是编辑状态就设置为店长一个选项
						//			if(!_this.isEdit) {
						//				_this.jobs = _this.jobs.slice(0, 1);
						//			}
						_this.job.setData(_this.jobs)
						_this.group = new mui.PopPicker();
						if(JobAndGroupdata.group != undefined) {
							for(var i = 0; i < JobAndGroupdata.group.length; i++) {
								_this.groups.push({
									'groupId': JobAndGroupdata.group[i].groupId,
									'text': JobAndGroupdata.group[i].name
								})
							}
							_this.group.setData(_this.groups)
						}
					})
				},
				methods: {
					// 获取团队和角色信息
					getJobAndGroupData: function() {
						var datas;
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
							},
							fun_Success: function(data) {
								if(data.success) {
									datas = data.data;
								}
							}
						}
						Fun_App.ExAjax("merchantAccount/getJobAndGroup", sendData)
						return datas;
					},

					// 显示联动插件
					showPicker: function(selects, key) {
						var _this = this;
						selects.show(function(items) {
							if(key === "job") { //判断选项的类型
								_this.pageData.jobId = items[0].jobId;
								_this.pageData.jobName = items[0].text;
								//判断当前选择的角色是否显示团队
								if(items[0].jobId != 2 && Fun_App.getdata('jobCode') == 'BOSS') {
									_this.isShowGroup = true;
								} else {
									_this.isShowGroup = false
									_this.pageData.groupId = null;
									_this.pageData.groupName = null;
								}
							} else {
								_this.pageData.groupId = items[0].groupId;
								_this.pageData.groupName = items[0].text;
							}
						})

					},
					// 检测角色信息
					checkUserData: function(key) {
						clearInterval(this.timer);
						var _this = this;
						switch(key) {
							case "mobile":
								(_this.check.checkPhoneNum(_this.pageData.phone) == false) ? this.isSend = true: this.isSend = false;
								break;
							case "messageCode":
								(_this.check.checkCode(_this.pageData.messageCode) == false) ? this.isSend = true: this.isSend = false;
								break;
						}
					},
					// 短信验证码倒计时
					timeOut: function() {
						this.showOutTime = true;
						this.second--;
						if(this.second < 1) {
							this.showOutTime = false;
							this.second = 90;
						} else {
							var timeout = setTimeout(this.timeOut, 1000);
						}
					},
					// 短信接口
					smsVerify: function() {
						var _this = this;
						var sendData = {
							config: {
								"token": Fun_App.getdata('token'),
								"phone": this.pageData.phone,
								'type': 7
							},
							fun_Success: function(data) {
								(data.success) ? mui.toast(data.message): mui.toast(data.message);
							}
						}
						if(this.showOutTime == false && this.pageData.phone != null) {
							mui.plusReady(function() {
								Fun_App.ExAjax("merchant/smsVerify", sendData);
								// 发送成功调用倒计时
								_this.timeOut()
							})
						} else {
							mui.toast('请输入手机号!');
						}
					},
					// 创建子账号
					createAccount: function() {
						var _this = this ;
						var sendData = {
							config: this.pageData,
							fun_Success: function(data) {
								mui("#addBtn").button('reset');
								if(data.success) {
									_this.isSuccess = true;
									var teamAdminPage = plus.webview.getWebviewById('teamAdmin.html');
									mui.fire(teamAdminPage, "getTeamList")
									_this.closeWin(1000);
								}
								data.success ? mui.toast(data.message) : mui.toast(data.message);
							}
						}
						if(Fun_App.checkObjIsNull(this.pageData, ['groupId']) != false) {
							mui("#addBtn").button('loading');
							Fun_App.ExAjax("merchantAccount/create", sendData);
						} else {
							mui.toast('还有数据没填！');
						}

					},
					// 关闭窗口
					/*
					 *@param {number}
					 * */
					closeWin: function(timer) {
						var detailPage = plus.webview.getWebviewById('teamAdmin.html');
						mui.fire(detailPage, 'getTeamList');
						setTimeout(function() {
							plus.webview.currentWebview().close();
						}, timer)
					},
					// 编辑角色信息
					editAccount: function() {
						var _this = this;
						console.log(JSON.stringify(this.pageData))
						var sendData = {
							config: this.pageData,
							fun_Success: function(data) {
								mui("#addBtn").button('reset');
								if(data.success) {
									_this.isSuccess = true;
									var teamAdminPage = plus.webview.getWebviewById('teamAdmin.html');
									mui.fire(teamAdminPage, "getTeamList")
									_this.closeWin(1000);
								}
								(data.success) ? mui.toast(data.message): mui.toast(data.message);
							}
						}
						console.log(Fun_App.checkObjIsNull(this.pageData, ["groupId"]))
						if(Fun_App.checkObjIsNull(this.pageData, ["groupId"]) != false) {
							console.log(JSON.stringify(this.pageData))
							mui("#addBtn").button('loading');
							Fun_App.ExAjax("merchantAccount/editAccount", sendData)
						} else {
							mui.toast('还有数据没填！');
						}
					},
					// 提交数据
					upData: function() {
						console.log(JSON.stringify(this.pageData))
						// 删除groupName这个属性因为提交数据用不到
						delete this.pageData.groupName
						// 判断当前状态是否是编辑 and 创建 
						this.isEdit ? this.createAccount() : this.editAccount();
					}
				}
			})
		