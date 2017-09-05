(function($, doc) {
	$.init();
	$.plusReady(function() {
		var accountNameBox = doc.querySelector("#accountName"), //账号名称
			pageTitBox = doc.querySelector("#pageTit"), //页面标题
			accountPhoneNumBox = doc.querySelector("#accountPhoneNum"), //账号电话
			userResultBox = doc.querySelector("#userResult"), //角色
			accountPhoneCodeBox = doc.querySelector("#accountPhoneCode"),
			userResult1Box = doc.querySelector("#userResult1"), //团队
			addBtnBox = doc.querySelector("#addBtn"), //添加按钮
			getMsgBox = doc.querySelector(".getMsg"),
			jobCode = Fun_App.getdata("jobCode"),
			second = 90;
		jobs = [], groups = [];
		var Job = new $.PopPicker(); //角色
		var group = new $.PopPicker(); //团队
		var accountId = null;
		var accountData = { //获取用户输入的数据
			accountName: null, //账户姓名
			accountPhoneNum: null, //账户的电话
			jobName: null, //角色的名称
			jobId: null, //角色的id
			groupId: null, //团队的id
			accountPhoneCode: null
		};
		getJobAndGroupData();

		var getObj = Fun_App.getextrasdata();
		//判断当前是否是添加或者是编辑
		if(getObj != undefined) {
			addBtnBox.innerText = '编辑';
			pageTitBox.innerText = '编辑子账号';
			accountId = getObj.id;
			accountNameBox.value = accountData.accountName = getObj.name; //账户名称
			accountPhoneNumBox.value = accountData.accountPhoneNum = getObj.phone; //电话号码 
			userResultBox.innerText = accountData.jobName = getObj.jobName; //角色
			delete accountData.accountPhoneCode;
			console.log(JSON.stringify(accountData))
			document.querySelector("#PhoneCode").style.display = 'none';
			//获取团队的名称
			for(var i = 0; i < groups.length; i++) {
				if(groups[i].groupId == getObj.groupId) {
					userResult1Box.innerText = groups[i].text;
				}
			}
			//获取角色的id
			for(var j = 0; j < jobs.length; j++) {
				if(jobs[j].text == getObj.jobName) {
					accountData.jobId = jobs[j].jobId
				}
			}
			if(getObj.jobName == "店长") {
				document.querySelector("#showUserPicker2").style.display = "none";
			}
			for(i in jobs) {
				if(jobs[i].text == "员工") {
					jobs.splice(i, 1);
				}
			}
		}
		//角色数据
		Job.setData(
			jobs //角色
		);
		//团队数据
		group.setData(
			groups //团队
		);
		//获取角色和团队的信息
		function getJobAndGroupData() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
				},
				fun_Success: function(data) {
					if(data.success) {
						for(i in data.data) {
							for(j in data.data[i]) {
								if(i == "job") {
									jobs.push({
										"jobId": data.data[i][j].jobId,
										"text": data.data[i][j].jobName
									})
								} else {
									groups.push({
										"groupId": data.data[i][j].groupId,
										"text": data.data[i][j].name
									})
								}
							}
						}
					}
				}
			}
			Fun_App.ExAjax("merchantAccount/getJobAndGroup", sendData)
		}
		//添加账号
		function addAccount() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"name": accountData.accountName, //姓名
					"phone": accountData.accountPhoneNum, //手机号
					"groupId": accountData.groupId, //团队ID
					"jobId": accountData.jobId, //角色id
					"jobName": accountData.jobName //角色名字
				},
				fun_Success: function(data) {
					if(data.success) {
						doc.querySelector(".addSuccess").style.display = "block";
						closeWin(1000)
					} else {
						mui.toast(data.message);
						return false;
					}
				}
			}
			console.log(JSON.stringify(sendData.config))
			Fun_App.ExAjax("merchantAccount/create", sendData)
		}
		getMsgBox.addEventListener("tap", function() {

			smsVerify()
		})

		function smsVerify() {
			var sendData = {
				config: {
					"token": Fun_App.getdata('token'),
					'type': 7
				},
				fun_Success: function(data) {
					(data.success) ? mui.toast(data.message): mui.toast(data.message);
					if(data.success) {
						second--;
						if(second < 1) {
							second = 90;
							getMsgBox.disabled = true
							getMsgBox.innerText = '获取短信验证码';
						} else {
							getMsgBox.disabled = false
							getMsgBox.innerText = '还剩' + second + '秒';
							setTimeout(smsVerify, 1000)
						}
					}
				}
			}
			Fun_App.ExAjax("merchant/smsVerify", sendData);

		}
		//关闭窗口事件
		function closeWin(timer) {
			var detailPage = plus.webview.getWebviewById('teamAdmin.html');
			mui.fire(detailPage, 'getTeamList');
			setTimeout(function() {
				plus.webview.currentWebview().close();
			}, timer)
		}
		//编辑员工信息
		function editAccount() {
			var sendData = {
				config: {
					"token": Fun_App.getdata("token"),
					"id": accountId,
					"name": accountData.accountName, //姓名
					"phone": accountData.accountPhoneNum, //手机号
					"groupId": accountData.groupId, //团队ID
					"jobId": accountData.jobId, //角色id
					"jobName": accountData.jobName //角色名字
				},
				fun_Success: function(data) {
					if(data.success) {
						doc.querySelector(".addSuccess .addSuccessTxt").innerText = "编辑成功";
						doc.querySelector(".addSuccess").style.display = "block";
						closeWin(1000) //关闭当前窗口
					}
				}
			}
			console.log("edit:" + JSON.stringify(sendData.config))
			Fun_App.ExAjax("merchantAccount/editAccount", sendData);
		}
		//选项弹窗
		$(".mui-table-view").on("tap", ".select", function(index) {
			var ids = this.getAttribute("id"); //获取选项的id
			sonDoc = this.childNodes[1];
			if(ids === "showUserPicker") { //判断选项的类型
				Job.show(function(items) {

					sonDoc.innerText = accountData.jobName = items[0].text;
					accountData.jobId = items[0].jobId;
					if(items[0].text == "员工" && jobCode == 'BOSS') {
						document.querySelector("#showUserPicker2").style.display = "block";
					} else {
						document.querySelector("#showUserPicker2").style.display = "none";
					}
				})
			} else {
				group.show(function(items) {

					sonDoc.innerText = items[0].text == undefined ? '请先绑定店长' : items[0].text;
					accountData.groupId = items[0].groupId;
				})
			}
		}, false)
		//判断用户输入数据
		mui("input").each(function(i, item) {
			item.addEventListener("change", function() {
				var ids = this.getAttribute("id");
				if(ids == "accountName") {
					if(this.value == "" && this.value.length < 20) {
						$.toast("姓名不能为空,且不能大于10个字符！");
						return false;
					} else {
						accountData.accountName = this.value;
					}
				} else {
					var pat = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
					if(!pat.test(this.value)) {
						$.toast("手机号码格式不正确")
						return false;
					} else {
						accountData.accountPhoneNum = this.value;
					}
				}
			})
		})
		//判断当前是编辑还是添加
		addBtnBox.addEventListener("tap", function() {
			var BtnTxt = this.innerText; //获取当前按钮的文本
			console.log(BtnTxt)
			console.log(JSON.stringify(accountData))
			this.focus();
			if(Fun_App.checkObjIsNull(accountData, "groupId") == false) {
				mui.toast("你还有东西没填哦")
			} else {
				//判断当前页面的状态执行不同的任务
				if(BtnTxt == "绑定") {
					addAccount(); //添加账号
				} else {
					editAccount(); //编辑账号
				}

			}

		})
		if(jobCode != 'BOSS') {
			document.querySelector("#showUserPicker2").style.display = "none";
		}
	})

}(mui, document))