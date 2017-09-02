(function(mui) {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '加载...',
				callback: pullupRefresh
			}
		}
	});
	var page = 1;

	function pullupRefresh() {
		++page;
		getshopData(page);
		return;
	}
	/*	Fun_App.OpenPage('#decorateShop', 'decorationshop.html', 'pop-in', ''); //店铺装修
		Fun_App.OpenPage('#previewShop', 'detailinfo.html', 'pop-in', ''); //店铺预览*/
	var shopListBox = document.querySelector("#shopList"),
		myShopBox = document.querySelector("#myShop"),
		myShopAddressBox = document.querySelector("#myShopAddress"),
		logoimgBox = document.querySelector("#logoImg"), //店铺logo
		totalIncomeBox = document.querySelector("#totalIncome");
	//单个获取累计收益
	function getshopIco() {
		var shopData1 = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(data) {
				logoimgBox.src = picservice + data.data.logoImg; //logo
				myShopBox.innerText = data.data.merchantName;
				myShopAddressBox.innerText = data.data.addressInfo;
				totalIncomeBox.innerText = data.data.totalIncome;
			}
		}
		Fun_App.ExAjax("merchantPerson/myShop", shopData1);
	}

	function getshopData(pageNum) {
		var shopData = {
			config: {
				"token": Fun_App.getdata("token"),
				"pageIndex": pageNum
			},
			fun_Success: function(data) {
				totalPage = Math.ceil(data.total / 1)
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((pageNum > totalPage));
				var datas = data.data.merchants;
				if(data.success) {
					for(var i = 0; i < datas.length; i++) {
						shopListBox.innerHTML +=
							'<div class="mui-table-view-cell">' +
							'<div class="shop-top-box">' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell mui-col-xs-8 shop-top-info">' +
							'<span class="shop-top-title mui-ellipsis">店名：<span>' + datas[i].merchantName + '</span></span>' +
							'<span class="shop-top-money">￥<span>' + datas[i].money + '</span></span>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'<div class="shop-bottom-box">' +
							'<div class="mui-table">' +
							'<div class="mui-table-cell mui-col-xs-8">' +
							'<div>负责人：<span>' + datas[i].personCharge + '</span></div>' +
							'<div class="mobileInfo">联系电话：<span>' + datas[i].personChargePhone + '</span></div>' +
							'</div>' +
							'<div class="mui-table-cell mui-col-xs-4 mui-text-right">' +
							'<a href="tel:' + datas[i].personChargePhone + '" class="mui-btn mui-btn-primary mui-btn-outlined btn-xxt">联系TA</a>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</li>'
					}

				}
			}
		}
		Fun_App.ExAjax("merchantPerson/myShop", shopData)
	}
	mui.plusReady(function() {
		getshopData();
		getshopIco();
	})
}(mui))
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui('.mui-scroll-wrapper').scroll();