<<<<<<< HEAD
	var Vue = new Vue({
				el: "#partyIn",
				data: function() {
					return {
						see:false,
						shares: null,
						shareShowBox: false,
						type: {
							'4': '众筹',
							'3': '购票'
						},
						status: {
							'0': '未审核',
							'1': "审核通过",
							'2': "审核不通过",
							"3": '下架',
							"4": "众筹成功",
							"5": "众筹失败",
							"6": '预览'
						},
						arcId: null,
						strartAndEnd:null,
						pageData: {},
						shareServer: null
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						Fun_App.pulldownRefresh();
						console.log(JSON.stringify(Fun_App.getextrasdata()))
						//see代表的是预览
						if(Fun_App.getextrasdata().id != "see") {
							_this.see = true;
							_this.getPartyIn(Fun_App.getextrasdata(), function(resData) {
								_this.pageData = resData.data;
								_this.arcId= resData.data.id;
								_this.strartAndEnd = resData.data.startTime;
								_this.strartAndEnd +=" ~ "+ resData.data.endTime;
								console.log(JSON.stringify(_this.pageData))
							});
						} else {
							_this.pageData = Fun_App.getextrasdata().data;
						}
						plus.share.getServices(function(s) {
							_this.shareServer = s;
							console.log(JSON.stringify(s))
						}, function(e) {

						})
					})
				},
				methods: {
					getPartyIn: function(id, callBack) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								id: id
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantParty/playKaDetail", sendData)
					},
					share: function(id,name) {
						var arc = this.pageData.description;
						console.log(JSON.stringify(this.shareServer))
						var shareOption = this.shareServer[id];
						var _this = this ;
						shareOption.send({
							title:"我在【兑咖 · 娱乐】— 邀请您参加-"+this.pageData.theme+"-一起咖吃咖玩",
							content: "脱掉你沉重的包袱和躯壳，引爆高潮，无趴不欢，尽在兑咖 · 娱乐",
							href: "http://www.yunduiwang.com/api/resources/html/party.html?id="+_this.arcId+"&from=groupmessage",
							extra: {
								scene: name
							},
							thumbs:["shareLogo.png"]
						}, function() {
							mui.toast("分享成功!");
						}, function(e) {
							mui.toast('分享失败!')
						});
						
					}
				}
				

			})
=======
	var Vue = new Vue({
				el: "#partyIn",
				data: function() {
					return {
						see:false,
						shares: null,
						shareShowBox: false,
						type: {
							'4': '众筹',
							'3': '购票'
						},
						status: {
							'0': '未审核',
							'1': "审核通过",
							'2': "审核不通过",
							"3": '下架',
							"4": "众筹成功",
							"5": "众筹失败",
							"6": '预览'
						},
						arcId: null,
						strartAndEnd:null,
						pageData: {},
						shareServer: null
					}
				},
				created: function() {
					var _this = this;
					mui.plusReady(function() {
						Fun_App.pulldownRefresh();
						console.log(JSON.stringify(Fun_App.getextrasdata()))
						//see代表的是预览
						if(Fun_App.getextrasdata().id != "see") {
							_this.see = true;
							_this.getPartyIn(Fun_App.getextrasdata(), function(resData) {
								_this.pageData = resData.data;
								_this.arcId= resData.data.id;
								_this.strartAndEnd = resData.data.startTime;
								_this.strartAndEnd +=" ~ "+resData.data.endTime.split(" ")[1];
								console.log(JSON.stringify(_this.pageData))
							});
						} else {
							_this.pageData = Fun_App.getextrasdata().data;
						}
						plus.share.getServices(function(s) {
							_this.shareServer = s;
							console.log(JSON.stringify(s))
						}, function(e) {

						})
					})
				},
				methods: {
					getPartyIn: function(id, callBack) {
						var sendData = {
							config: {
								token: Fun_App.getdata("token"),
								id: id
							},
							fun_Success: function(data) {
								callBack(data)
							}
						}
						Fun_App.ExAjax("merchantParty/playKaDetail", sendData)
					},
					share: function(id,name) {
						var arc = this.pageData.description;
						console.log(JSON.stringify(this.shareServer))
						var shareOption = this.shareServer[id];
						var _this = this ;
						shareOption.send({
							title:"我在【兑咖 · 娱乐】— 邀请您参加-"+this.pageData.theme+"-一起咖吃咖玩",
							content: "脱掉你沉重的包袱和躯壳，引爆高潮，无趴不欢，尽在兑咖 · 娱乐",
							href: "http://www.yunduiwang.com/api/resources/html/party.html?id="+_this.arcId+"&from=groupmessage",
							extra: {
								scene: name
							},
							thumbs:["shareLogo.png"]
						}, function() {
							mui.toast("分享成功!");
						}, function(e) {
							mui.toast('分享失败!')
						});
						
					}
				}
				

			})
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
			