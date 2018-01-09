<<<<<<< HEAD
var Vue = new Vue({
				el: "#activityCenter",
				data: function() {
					return {
						list: [],
						page: 1,// 初始页码
						pageLen: pageLen,// 页码的长度muihelper.js有定义
						totalPage: null,// 总页数
						activityDay: {},// 活动天数
						isNoData:false,//是否有自建活动
						myScroll: null,
						noneDay: 0,//占位的不是日期日期第一日前的空日期
						showDay: [],//显示活动的数组
						nowDate: new Date(),
						nowY: 0,
						nowM: 0,
						nowD: 0,
						isShowRoom: false,//是否显示编辑房间 酒店 ktv显示 其他不显示
						roomNum: 0,//房间数
						soldNum: 0,//售出
						activityId: null,//存储编辑房间需要的showDay activityId
						keys: null//存储编辑房间需要的showDay kye
					}
				},
				created: function() {
					var _this = this;
					this.nowY = this.nowDate.getFullYear();
					this.nowM = this.nowDate.getMonth() + 1;
					this.nowD = this.nowDate.getDate();

					function loaded() {
						this.myScroll = new iScroll(document.querySelector("#item1"), {
							checkDOMChanges: true
						})
					}
					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);
					document.addEventListener('DOMContentLoaded', loaded, false)
					
					mui.plusReady(function() {
						if(Fun_App.getdata("shopType") != "null") {
							_this.isShowRoom = true
						}
						// 自建活动创建后刷新页面
						window.addEventListener("selfBuildActivity", function() {
							_this.selfBuildActivity(function(resData) {
								_this.totalPage = Math.ceil(resData.total / _this.pageLen);
								_this.list = resData.data;
								_this.isNoData = (_this.list.length < 1) ? true : '';
							}, 1);
						})
						// 自建活动
						_this.selfBuildActivity(function(resData) {
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
							_this.list = resData.data;
							_this.isNoData = (_this.list.length < 1) ? true : '';
						}, 1)
						// 滚动列表插件
						refresher.init({
							id: "wrapper",
							pullDownAction: _this.Refresh,
							pullUpAction: _this.Load
						});
						/*日历*/
						_this.renderMonth();
					})

				},
				methods: {
					// 自建活动
					selfBuildActivity: function(callBack, page) {
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"pageIndex": page
							},
							fun_Success: function(data) {
								callBack(data);
							}
						};
						Fun_App.ExAjax("merchantActivity/selfBuildActivity", sendData);
					},
					//活动下架
					offShelfActivity: function(rmId) {
						var _this = this;
						var rmActiveityData = {
							config: {
								"token": Fun_App.getdata("token"),
								"id": rmId
							},
							fun_Success: function(data) {
								if(data.success) {
									_this.selfBuildActivity(function(resData) {
										_this.list = resData.data;
									}, 1)
								}
							}
						}
						mui.plusReady(function() {
							Fun_App.ExAjax("merchantActivity/offShelfActivity", rmActiveityData)
						})
					},
					// 平台活动
					f2cActivity: function(callBack, otherM) {
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"activityDate": this.nowY + "-" + ((otherM <= 9) ? "0" + otherM : otherM) + "-" + "01"
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantActivity/f2cActivity", sendData)
					},
					open: function() {
						mui.plusReady(function() {
							Fun_App.openWin('createactivity.html', 'pop-in', ''); //创建活动
						})
					},
					Load: function() {
						var _this = this;
						this.page++;
						if(this.page <= this.totalPage) {
							// 自建活动
							this.selfBuildActivity(function(resData) {
								_this.list = _this.list.concat(resData.data);
							}, this.page)
						} else {
							// scroll插件的提示语
							refresher.info.pullUpLable = '没有更多数据了!';
						}
						wrapper.refresh();
					},
					/*// 下拉
					Refresh: function() {
						wrapper.refresh();
					},*/
					// 切换月份
					changeMouth: function(change) {
						// 判断当前点击的是不是上一个月
						if(change == 'pre') {
							if(this.nowM <= 1) {
								this.nowM = 13;// 设置的月份要大于总月份
								this.nowY -= 1;
							}
							this.nowM--;
						} else {
							if(this.nowM >= 12) {
								this.nowM = 0;// 设置的月份要小于总月份
								this.nowY += 1;
							}
							this.nowM++;
						}
						this.renderMonth();
					},
					// 显示月份列表
					showMouthList:function(){
						var _this =this;
						var mouth = new mui.PopPicker()
					mouth.setData([{
						text: '1'
					}, {
						text: '2'
					}, {
						text: '3'
					}, {
						text: '4'
					}, {
						text: '5'
					}, {
						text: '6'
					}, {
						text: '7'
					}, {
						text: '8'
					}, {
						text: '9'
					}, {
						text: '10'
					}, {
						text: '11'
					}, {
						text: '12'
					}]);
					mouth.show(function(items) {
						_this.nowM=items[0].text;
						_this.f2cActivity(function(){
								// 绘制日历
								_this.renderMonth()
							}, _this.nowM)
					});
						
					},
					// 是否是闰年
					isLeapYear: function(year) {
						return(year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
					},
					// 设置月份并返回当月第一天是星期几
					setMonth: function(mouth) {
						var changeDate = this.nowY + "-" + (mouth <= 9 ? '0' + mouth : mouth) + "-01";
						var date = new Date(changeDate);
						return date.getDay(); // 返回当前月份的第一天
					},
					// 绘制日历
					renderMonth: function() {
						var _this = this;
						this.showDay = [];
						// 一年之中所有的月份天数
						var yearArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
						yearArr[1] += this.isLeapYear(this.nowY);
						this.noneDay = this.setMonth(this.nowM);
						// f2c 的活动信息
						var f2cActivityInfo = {
							f2cActivityDay: [], // f2c活动日
							f2cActivityDayId: [],// f2c的id
							f2cActivityRoomNum: [],// 参与房间数
							f2cActivitySoldRoom: []// 已售房间数
						}
						// 循环添加到显示的天数
						for(var i = 1; i <= yearArr[this.nowM - 1]; i++) {
							this.showDay.push({
								day: i,
								isActive: false,
								f2c: {
									activityId: 0,
									RoomNum: 0,
									SoldRoom: 0,
								}
							})
						}
						setTimeout(function() {
							_this.f2cActivity(function(resData) {
								for(var i = 0; i < resData.data.length; i++) {
									var day = Number(resData.data[i].activityDate.split("-")[2]);
									_this.showDay[day - 1].isActive = true;
									_this.showDay[day - 1].f2c.activityId = resData.data[i].id;
									_this.showDay[day - 1].f2c.RoomNum = resData.data[i].roomNum;
									_this.showDay[day - 1].f2c.SoldRoom = resData.data[i].saleNum;
								}
								console.log(JSON.stringify(_this.showDay))
							}, _this.nowM)
						}, 0)

						/*console.log(JSON.stringify(this.showDay))*/
						/*this.showDay = yearArr[this.nowM - 1]*/
					},
					// 更新房间数量
					updateRoomNum: function(key) {
						console.log(JSON.stringify(this.showDay[key]))
						this.roomNum = this.showDay[key].f2c.RoomNum;
						this.soldNum = this.showDay[key].f2c.SoldRoom;
						this.activityId = this.showDay[key].f2c.activityId;
						this.keys = key;
					},
					// 改变房间数量
					changeRoom: function(id,keys) {
						var _this = this;
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"id": id, //活动id
								"roomNum": null //预留的房间数
							},
							fun_Success: function(data) {
								if(data.success) {
									mui.toast('修改房间数成功!')
								}
							}
						}
						if(_this.showDay[_this.keys].isActive){
							mui.prompt('', this.roomNum, '房间数量', ['取消', '确认'], function(e) {
							if(e.index) {
								sendData.config.roomNum = _this.roomNum = e.value;
								_this.showDay[_this.keys].f2c.RoomNum = e.value;
								Fun_App.ExAjax("merchantActivity/updateRoomNum", sendData);
							}
						}, 'div')
						document.querySelector("input").setAttribute("type", "tel")
						}else{
							mui.toast('当前日期不可编辑!')
						}
						
					}
				},
				filters: {
					activityState: function(val) {
						var nowDate = new Date().getTime(),
							activityDate = new Date(val).getTime();

						if(nowDate < activityDate) {
							return "未开始";
						} else {
							return "进行中";
						}
					}
				}
=======
var Vue = new Vue({
				el: "#activityCenter",
				data: function() {
					return {
						list: [],
						page: 1,// 初始页码
						pageLen: pageLen,// 页码的长度muihelper.js有定义
						totalPage: null,// 总页数
						activityDay: {},// 活动天数
						isNoData:false,//是否有自建活动
						myScroll: null,
						noneDay: 0,//占位的不是日期日期第一日前的空日期
						showDay: [],//显示活动的数组
						nowDate: new Date(),
						nowY: 0,
						nowM: 0,
						nowD: 0,
						isShowRoom: false,//是否显示编辑房间 酒店 ktv显示 其他不显示
						roomNum: 0,//房间数
						soldNum: 0,//售出
						activityId: null,//存储编辑房间需要的showDay activityId
						keys: null//存储编辑房间需要的showDay kye
					}
				},
				created: function() {
					var _this = this;
					this.nowY = this.nowDate.getFullYear();
					this.nowM = this.nowDate.getMonth() + 1;
					this.nowD = this.nowDate.getDate();

					function loaded() {
						this.myScroll = new iScroll(document.querySelector("#item1"), {
							checkDOMChanges: true
						})
					}
					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);
					document.addEventListener('DOMContentLoaded', loaded, false)
					
					mui.plusReady(function() {
						if(Fun_App.getdata("shopType") != "null") {
							_this.isShowRoom = true
						}
						// 自建活动创建后刷新页面
						window.addEventListener("selfBuildActivity", function() {
							_this.selfBuildActivity(function(resData) {
								_this.totalPage = Math.ceil(resData.total / _this.pageLen);
								_this.list = resData.data;
								_this.isNoData = (_this.list.length < 1) ? true : '';
							}, 1);
						})
						// 自建活动
						_this.selfBuildActivity(function(resData) {
							_this.totalPage = Math.ceil(resData.total / _this.pageLen);
							_this.list = resData.data;
							_this.isNoData = (_this.list.length < 1) ? true : '';
						}, 1)
						// 滚动列表插件
						refresher.init({
							id: "wrapper",
							pullDownAction: _this.Refresh,
							pullUpAction: _this.Load
						});
						/*日历*/
						_this.renderMonth();
					})

				},
				methods: {
					// 自建活动
					selfBuildActivity: function(callBack, page) {
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"pageIndex": page
							},
							fun_Success: function(data) {
								callBack(data);
							}
						};
						Fun_App.ExAjax("merchantActivity/selfBuildActivity", sendData);
					},
					//活动下架
					offShelfActivity: function(rmId) {
						var _this = this;
						var rmActiveityData = {
							config: {
								"token": Fun_App.getdata("token"),
								"id": rmId
							},
							fun_Success: function(data) {
								if(data.success) {
									_this.selfBuildActivity(function(resData) {
										_this.list = resData.data;
									}, 1)
								}
							}
						}
						mui.plusReady(function() {
							Fun_App.ExAjax("merchantActivity/offShelfActivity", rmActiveityData)
						})
					},
					// 平台活动
					f2cActivity: function(callBack, otherM) {
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"activityDate": this.nowY + "-" + ((otherM <= 9) ? "0" + otherM : otherM) + "-" + "01"
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantActivity/f2cActivity", sendData)
					},
					open: function() {
						mui.plusReady(function() {
							Fun_App.openWin('createactivity.html', 'pop-in', ''); //创建活动
						})
					},
					Load: function() {
						var _this = this;
						this.page++;
						if(this.page <= this.totalPage) {
							// 自建活动
							this.selfBuildActivity(function(resData) {
								_this.list = _this.list.concat(resData.data);
							}, this.page)
						} else {
							// scroll插件的提示语
							refresher.info.pullUpLable = '没有更多数据了!';
						}
						wrapper.refresh();
					},
					/*// 下拉
					Refresh: function() {
						wrapper.refresh();
					},*/
					// 切换月份
					changeMouth: function(change) {
						// 判断当前点击的是不是上一个月
						if(change == 'pre') {
							if(this.nowM <= 1) {
								this.nowM = 13;// 设置的月份要大于总月份
								this.nowY -= 1;
							}
							this.nowM--;
						} else {
							if(this.nowM >= 12) {
								this.nowM = 0;// 设置的月份要小于总月份
								this.nowY += 1;
							}
							this.nowM++;
						}
						this.renderMonth();
					},
					// 显示月份列表
					showMouthList:function(){
						var _this =this;
						var mouth = new mui.PopPicker()
					mouth.setData([{
						text: '1'
					}, {
						text: '2'
					}, {
						text: '3'
					}, {
						text: '4'
					}, {
						text: '5'
					}, {
						text: '6'
					}, {
						text: '7'
					}, {
						text: '8'
					}, {
						text: '9'
					}, {
						text: '10'
					}, {
						text: '11'
					}, {
						text: '12'
					}]);
					mouth.show(function(items) {
						_this.nowM=items[0].text;
						_this.f2cActivity(function(){
								// 绘制日历
								_this.renderMonth()
							}, _this.nowM)
					});
						
					},
					// 是否是闰年
					isLeapYear: function(year) {
						return(year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
					},
					// 设置月份并返回当月第一天是星期几
					setMonth: function(mouth) {
						var changeDate = this.nowY + "-" + (mouth <= 9 ? '0' + mouth : mouth) + "-01";
						var date = new Date(changeDate);
						return date.getDay(); // 返回当前月份的第一天
					},
					// 绘制日历
					renderMonth: function() {
						var _this = this;
						this.showDay = [];
						// 一年之中所有的月份天数
						var yearArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
						yearArr[1] += this.isLeapYear(this.nowY);
						this.noneDay = this.setMonth(this.nowM);
						// f2c 的活动信息
						var f2cActivityInfo = {
							f2cActivityDay: [], // f2c活动日
							f2cActivityDayId: [],// f2c的id
							f2cActivityRoomNum: [],// 参与房间数
							f2cActivitySoldRoom: []// 已售房间数
						}
						// 循环添加到显示的天数
						for(var i = 1; i <= yearArr[this.nowM - 1]; i++) {
							this.showDay.push({
								day: i,
								isActive: false,
								f2c: {
									activityId: 0,
									RoomNum: 0,
									SoldRoom: 0,
								}
							})
						}
						setTimeout(function() {
							_this.f2cActivity(function(resData) {
								for(var i = 0; i < resData.data.length; i++) {
									var day = Number(resData.data[i].activityDate.split("-")[2]);
									_this.showDay[day - 1].isActive = true;
									_this.showDay[day - 1].f2c.activityId = resData.data[i].id;
									_this.showDay[day - 1].f2c.RoomNum = resData.data[i].roomNum;
									_this.showDay[day - 1].f2c.SoldRoom = resData.data[i].saleNum;
								}
								console.log(JSON.stringify(_this.showDay))
							}, _this.nowM)
						}, 0)

						/*console.log(JSON.stringify(this.showDay))*/
						/*this.showDay = yearArr[this.nowM - 1]*/
					},
					// 更新房间数量
					updateRoomNum: function(key) {
						console.log(JSON.stringify(this.showDay[key]))
						this.roomNum = this.showDay[key].f2c.RoomNum;
						this.soldNum = this.showDay[key].f2c.SoldRoom;
						this.activityId = this.showDay[key].f2c.activityId;
						this.keys = key;
					},
					// 改变房间数量
					changeRoom: function(id,keys) {
						var _this = this;
						var sendData = {
							config: {
								"token": Fun_App.getdata("token"),
								"id": id, //活动id
								"roomNum": null //预留的房间数
							},
							fun_Success: function(data) {
								if(data.success) {
									mui.toast('修改房间数成功!')
								}
							}
						}
						if(_this.showDay[_this.keys].isActive){
							mui.prompt('', this.roomNum, '房间数量', ['取消', '确认'], function(e) {
							if(e.index) {
								sendData.config.roomNum = _this.roomNum = e.value;
								_this.showDay[_this.keys].f2c.RoomNum = e.value;
								Fun_App.ExAjax("merchantActivity/updateRoomNum", sendData);
							}
						}, 'div')
						document.querySelector("input").setAttribute("type", "tel")
						}else{
							mui.toast('当前日期不可编辑!')
						}
						
					}
				},
				filters: {
					activityState: function(val) {
						var nowDate = new Date().getTime(),
							activityDate = new Date(val).getTime();

						if(nowDate < activityDate) {
							return "未开始";
						} else {
							return "进行中";
						}
					}
				}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
			})