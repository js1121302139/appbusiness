var Vue = new Vue({
	el: "#app",
	data: {
		GETADDRLISTURL: "merchantPerson/getAddressList", // 获取地址列表
		isMaster: true, // 是否是达人
		addressLsit: [], //  活动地址列表
		partyInfoMod: 0, //模板的步长
		partyImgBox: [], //活动图片
		partyInfoImgBox: [], //活动详情图片
		locaImg: { //本地文件
			masterImg: "", //主图
			partyImgBox: [], //活动图片
			models: [], //活动详情图片
			serverModels: [], //服务器的图片路径
			partyInfoText: [], //活动文本
			locaDescription: "" //本地展示的详情
		},
		//data是上传到服务器的数据
		data: {
			token: Fun_App.getdata("token"),
			theme: "", //标题字符
			type: 3, //活动类别
			title:'',
			masterImg: "", //主图
			price: '',// 价格
			prepareStartTime: "",// 众筹开始时间
			prepareEndTime: "",// 众筹结束时间
			startTime: "",// 活动开始时间
			endTime: "",// 活动结束时间
			activityFlow: [], //活動步骤
			activityPackage: [], //活动的菜单
			description: "", //活动的详情
			pictures: [] //活动的图片不包含模块
		},
		isActive: false,// f购票 t众筹
		titLen: 0 // 标题长度
	},
	created: function() {
		var _this = this;
		mui.plusReady(function() {
			// 当前账户是不是达人账户 0为达人 1为商家
			_this.isMaster = Fun_App.getdata("merchantType") == 0;
			// 如果是达人
			if(_this.isMaster) {
				window.addEventListener('reload', function() {
					_this.getAddLsit(function(resData) {
						_this.addressLsit = resData.data;
					})
				});
				_this.getAddLsit(function(resData) {
					_this.addressLsit = resData.data;
					_this.addressLsit.forEach(function(item) {
						if(item.status == 1) {
							_this.data.location = item.location;
							_this.data.address = item.address;
							_this.data.longitude = item.longitude;
							_this.data.latitude = item.latitude;	
							console.log(JSON.stringify(_this.data));
						}
					})
				})
			}

		})
	},
	methods: {
		checkNum: function(val) {
			if(val == '') this.data.price = 0;
			console.log(val)
		},
		changePartyClass: function(index) { //更改活动类型 众筹 还是 购票
			this.isActive = !this.isActive;
			this.data.type = index;
			console.log(this.data.r)
		},
		titleLen: function() { //标题的长度
			this.titLen = this.data.theme.length;
		},
		addTime: function(timeCalss) { //添加时间
			var _this = this;
			var picker = new mui.DtPicker();
			picker.show(function(rs) {
				_this.data[timeCalss] = rs.text + ':00';
				picker.dispose();
			});
		},
		removListItem: function(types, key) { //移除列表项
			this.data[types].splice(key, 1);
		},
		addModel: function() { //添加模块
			this.locaImg.models.push([]);
			this.locaImg.serverModels.push([]);
			this.partyInfoImgBox.push([]);
			this.locaImg.partyInfoText[this.partyInfoMod] = null;
			this.partyInfoMod++;
		},
		// 获取活动地址
		getAddLsit: function(callBack) {
			var sendData = {
				config: {
					token: Fun_App.getdata('token')
				},
				fun_Success: function(resData) {
					callBack(resData);
				}
			}
			Fun_App.ExAjax(this.GETADDRLISTURL, sendData)
			//Fun_App.ExAjax(this.DELADDURL,sendData)
		},
		addModelImg: function(key) { //添加模块的图片
			var _this = this;
			mui.plusReady(function() {
				plus.gallery.pick(function(e) {
					//上传图片
					//_this.locaImg.models['model'+key].push(e);
					Fun_App.zipImg(e, function(data) {
						var datas = {}
						Fun_App.uploadFiles(data, function(datas) {
							console.log(JSON.stringify(datas))
							if(datas.data != null) {
								_this.locaImg.models[key].push(e);
								_this.locaImg.serverModels[key].push(datas.data.url);
							}
						}, 'modelImg')
					});
				}, function(e) {
					mui.toast('打开相册失败!');
				}, {
					filter: "image",
					multiple: false
				})
			})
		},
		// 添加列表项
		addListItem: function(types) { 
			if(types == 'menu') {
				this.data.activityPackage.push("");
			} else {
				this.data.activityFlow.push("");
			}
		},
		 // 移除图片
		removeImgBox: function(option, Imgclass, ImgServerclass, key) {
			var imgInfo = String(Imgclass).indexOf("file");
			Imgclass.splice(key, 1);
			ImgServerclass != '' ? ImgServerclass.splice(key, 1) : '';
			if(imgInfo != -1 && option != '') this.data.pictures.splice(key, 1);
			console.log(Imgclass)
		},
		// 添加活动主图
		addmasterImg: function() { 
			var _this = this;
			mui.plusReady(function() {
				plus.gallery.pick(function(e) {
					_this.locaImg.masterImg = e;
					//上传图片
					Fun_App.zipImg(e, function(data) {
						Fun_App.uploadFiles(data, function(datas) {
							console.log(JSON.stringify(datas) + "--------->")
							if(datas.data != null) {
								_this.data.masterImg = datas.data.saveFilePath;
							} else {
								mui.toast('上传失败!');
								mui.toast(datas.message);
							}
						}, "no")
					});
				}, function(e) {
					mui.toast('打开相册失败!')
				}, {
					filter: "image",
					multiple: false
				})
			})
		},
		// 活动的图片
		addPartyImgs: function(ImgClass) { 
			var _this = this;
			if(this.data.pictures.length < 2) {
				mui.plusReady(function() {
					plus.gallery.pick(function(e) {
						//上传图片
						Fun_App.zipImg(e, function(data) {
							Fun_App.uploadFiles(data, function(datas) {
								console.log(JSON.stringify(datas))
								if(datas.data != null) {
									_this.locaImg[ImgClass].push(e);
									_this.data.pictures.push(datas.data.saveFilePath);
								} else {
									mui.toast('上传失败!');
									mui.toast(datas.message);
								}
							}, "no")
						});
					}, function(e) {
						mui.toast('打开相册失败!')
					}, {
						filter: "image",
						multiple: false
					})
				})
			} else {
				mui.toast('选择图片数量超过限制!')
			}
		},
		//拼接文章字符串
		picturesHtml: function(pic, txt) {
			var htmlstr = "";
			for(var i = 0; i < pic.length; i++) {
				htmlstr += "<p>" + txt[i] == null ? "" : txt[i] + "</p>"
				for(var j = 0; j < pic[i].length; j++) {
					htmlstr += "<img src=" + pic[i][j] + ">"
				}
			}
			return htmlstr;
		},
		checkObj: function() {
			var _this = this;
			var activityFlow = this.data.activityFlow.toString().replace(/\,/g, ";");
			var activityPackage = this.data.activityPackage.toString().replace(/\,/g, ";");
			//拼接html
			this.data.description = this.picturesHtml(this.locaImg.serverModels, this.locaImg.partyInfoText);
			var cont = ["prepareStartTime", "prepareEndTime"]; //需要跳过检查的字段
			if(Fun_App.checkObjIsNull(this.data, (this.data.type == 3) ? cont : "") != false) {
				var partyTime = Fun_App.checkDateTime(this.data.startTime, this.data.endTime),
					prepareTime = (this.data.partyClass == 4) ? Fun_App.checkDateTime(this.data.prepareStartTime, this.data.prepareEndTime) : true;
				if(partyTime != false && prepareTime != false) {
					mui.plusReady(function() {
						_this.createParty(activityFlow, activityPackage);
					})
				}
			} else {
				console.log(JSON.stringify(this.data))
				mui.toast('还有数据没有填写,请检查后重试!')
			}

			/*console.log(JSON.stringify(this.locaImg))
			console.log(this.picturesHtml())*/
		},
		//  设置地址
		setaddress: function(item, key) {
			this.data.address = item.address;
			this.data.location = item.location;
			this.addressLsit.forEach(function(item, index) {
				item.status = 0;
			})
			this.addressLsit[key].status = 1;
			console.log(JSON.stringify(this.addressLsit) + "----")
		},
		open: function() {
			var _this = this;
			console.log(JSON.stringify(this.data));
			console.log(JSON.stringify(this.locaImg));
			//本地预览的数据
			var sendData = {
				theme: this.data.theme,
				price: this.data.price,
				endTime: this.data.endTime,
				saleNumber: 0,
				useNumber: 0,
				status: 6,
				type: this.data.type,
				number: this.data.number,
				startTime: this.data.startTime,
				description: this.picturesHtml(this.locaImg.models, this.locaImg.partyInfoText), //文章
			}
			console.log(this.data.description)
			mui.plusReady(function() {
				Fun_App.openWin("./partyIn.html", "pop-in", {
					id: 'see',
					data: sendData
				});
			})
		},
		openAddressWin: function() {
			Fun_App.openWin("../../page/account/activeAddress.html", "pop-in");
		},
		createParty: function(activityFlow, activityPackage, pictures) {
			console.log(JSON.stringify(this.locaImg.partyInfoText))
			var _this = this;
			var sendData = {
				config: {
					token: this.data.token,
					theme: this.data.theme,
					title: this.data.title,
					masterImg: this.data.masterImg,
					type: this.data.type,
					address: this.data.address,
					location: this.data.location,
					longitude:this.data.longitude,
					latitude:this.data.latitude,
					startTime: this.data.startTime,
					endTime: this.data.endTime,
					prepareStartTime: this.data.prepareStartTime,
					prepareEndTime: this.data.prepareEndTime,
					price: this.data.price,
					number: this.data.number,
					description: this.data.description,
					activityFlow: activityFlow,
					activityPackage: activityPackage,
					pictures: this.data.pictures
				},
				fun_Success: function(data) {
					if(data.success) {
						mui.alert('活动创建成功!', '提示', '知道了!', function(e) {
							var ws = plus.webview.getWebviewById("partyAdmin.html");
							mui.fire(ws, "getPartyList");
							plus.webview.currentWebview().close();
						}, 'div')
					}
				}
			}
			// 插入活动主图
			sendData.config.pictures.unshift(sendData.config.masterImg)
			// 当前活动是购票则删除众筹的时间
			if(_this.isActive == false) {
				delete sendData.config.prepareStartTime;
				delete sendData.config.prepareEndTime;
			}
			if(!_this.isMaster) {
				delete sendData.config.location;
				delete sendData.config.address;
				delete sendData.config.longitude;
				delete sendData.config.latitude;
			}
			console.log(JSON.stringify(sendData.config) + "create------")
			Fun_App.ExAjax("merchantParty/create", sendData);
		}

	}

})