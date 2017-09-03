mui.plusReady(function() {
	Fun_App.pulldownRefresh();
	var ws = plus.webview.all();
	Fun_App.getNetWorkState();
	var jobCodeName = Fun_App.getdata("jobCode"); //角色等级
	var windowState = plus.webview.currentWebview().success;
	var doms = {
		"zhgl": { //员工管理
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "teamAdmin.html"
		},
		"myUser": { //我的用户
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "myuser.html"
		},
		"myIncome": { //我的营业收入
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "myincome.html"
		},
		"mySharedIncome": { //我的共享收益
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "shareprofit.html"
		},
		"myQrCode": { //收款二维码
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "receivablesCode.html"
		},
		"evaluate": { //评价管理
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "evaluatemange.html"
		},
		"moneyCode": { //收款二维码 推广码
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "receivablesCode.html"
		},
		"activity": { //活动管理
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "activityCenter.html"
		},
		"msgCneter": { //消息中心
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "msgcenter.html"
		},
		/*"dataAnalysis": { //数据分析
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "dataAnalysis.html"
		},*/
		/*"tgjl": { //推广奖励
			"jobCode": ["BOSS", "SHOPOWNER", "STAFF"],
			"page": "promotionAward.html"
		},*/
		"changeShop": {
			"jobCode": ["BOSS"],
			"page": "changeShop.html"
		},
		"partyAdmin": {
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "partyAdmin.html"
		},
		"budgetAdmin": {
			"jobCode": ["BOSS", "SHOPOWNER"],
			"page": "budgetAdmin.html"
		}
	};
	/*
	 这里用来判断是什么角色显示什么
	 * */
	mui.each(doms, function(i, item) {
		var jobCodeStr = JSON.stringify(doms[i].jobCode)
		var Homedocs = document.querySelector("#" + i);
		var preNode = Homedocs.parentNode;
		if(jobCodeStr.indexOf(jobCodeName) == (-1)) {
			preNode.removeChild(Homedocs);
		}
	})
	/*结束*/
	//打开相应的页面
	(function(mui) {
		mui("body").on("tap", ".tap", function() {
			var idBox = this.getAttribute("id");
			Fun_App.openWin(doms[idBox].page)
		})
	}(mui))
	window.addEventListener("getindexData", function() {
		setTimeout(function() {
			getindexData();
		}, 0)
	})

	function getindexData() {
		if(this.getNetWorkState == 1) {
			console.log("false")
			return false;
		}
		var businessNameBox = document.querySelector("#businessName"), //店铺名字
			logoimgBox = document.querySelector("#logoimg"), //店铺logo
			businessAddressBox = document.querySelector("#businessAddress"), //店铺的地址
			todayOrderTotalMoneyBox = document.querySelector('#todayOrderTotalMoney'), // 今日订单总额
			todayOrdersBox = document.querySelector("#todayOrders"), // 今日订单个数
			msgNumBox = document.querySelector("#msgNum"), //消息的条数
			msgState = Fun_App.getdata("msgState"),
			todayShareIncomeBox = document.querySelector("#todayShareIncome"), // 今日共享收益
			budgetAdminBox = document.querySelector("#budgetAdmin"), //预定管理酒店ktv才显示
			shopType = Fun_App.getdata("shopType");

		var senddata = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(data) {
				if(data.data.logoImg != null) {
					logoimgBox.src = picservice + data.data.logoImg; //logo
					Fun_App.storagedata("shopLogo", picservice + data.data.logoImg); //存储店铺的logo
				} else {
					logoimgBox.src = "../../img/work-head.png";
				}
				businessNameBox.innerText = data.data.merchantName; //店铺名字
				businessAddressBox.innerText = data.data.merchantAddress; //店铺的地址
				todayOrderTotalMoneyBox.innerText = (data.data.todayOrderTotalMoney == null) ? 0 : data.data.todayOrderTotalMoney; // 今日订单总额
				todayOrdersBox.innerText = data.data.todayOrders == null ? 0 : data.data.todayOrders; // 今日订单个数
				todayShareIncomeBox.innerText = (data.data.todayShareIncome == null) ? 0 : data.data.todayShareIncome; // 今日共享收益
				if(data.data.messageNum > 0) {
					msgNumBox.style.display = "block";
					msgNumBox.innerText = data.data.messageNum; //消息的条数
				} else {
					msgNumBox.style.display = "none";
				}
			}
		}
		Fun_App.ExAjax("merchant/index", senddata);
		if(shopType == 'null') {
			budgetAdminBox.style.display = "none";
		}
	}
	setTimeout(function() {
		getindexData();
	}, 0)
})