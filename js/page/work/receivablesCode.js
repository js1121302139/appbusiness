<<<<<<< HEAD
mui.plusReady(function() {
	var qrCodeSrc = Fun_App.getdata("qrCodeSrc"),
		merchantType = Fun_App.getdata("merchantType"); //0 达人 1商家
		
	var 	qrCodeBox = document.getElementById("qrcode"),
		qrcodeTitBox = document.querySelector("#qrcodeTit"),
		qrFooterBox = document.querySelector("#qrFooter"),
		myMoneyCodeBox = document.querySelector("#myMoneyCode"), //收款码
		logoImgBox = document.querySelector("#logoImg"),
		merchantNameBOx = document.querySelector("#merchantName");
	logoImgBox.src = Fun_App.getdata("shopLogo");
	// 当前为达人的时
	if(merchantType == 0) {
		qrcodeTitBox.innerText = "推广二维码";
		qrFooterBox.style.display = "none";
	}

	// 本地加载二维码效果
	setTimeout(function() {
		if(qrCodeSrc == null || qrCodeSrc == "null") {
			var qrcode = new QRCode(qrCodeBox, {
				width: qrCodeBox.clientHeight,
				height: qrCodeBox.clientWidth
			});
			qrcode.makeCode(qrCode())
			qrCodeBox.querySelector("img").onload = function() {
				var src = qrCodeBox.querySelector("img").getAttribute("src")
				Fun_App.storagedata("qrCodeSrc", src)
				document.querySelector("#qrcodeLogo").style.display = "block";
			}
		} else {
			var img = document.createElement("img");
			img.setAttribute("src", qrCodeSrc);
			qrCodeBox.appendChild(img);
			qrCodeBox.querySelector("img").style.display = 'block';
			document.querySelector("#qrcodeLogo").style.display = "block";
		}
		document.querySelector("#qrcodeLogo").style.display = "block";
	}, 0);

	getindexData();
	// 获取到首页的数据
	function getindexData() {
		var senddata = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(data) {
				merchantNameBOx.innerText = data.data.merchantName + '(' + data.data.merchantAddress + ')';
				//myMoneyCodeBox.setAttribute("src", picservice + data.data.receiptCode)
			}
		}
		Fun_App.ExAjax("merchant/index", senddata);
	}

	function qrCode() {
		var url;
		var sendData = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(data) {
				// 当前类型为商家的时候显示正常的url 否则就显示带类型的地址 消费端根据这个来判断
				url = merchantType == 1 ? data.data.url : data.data.url + "&merchantType=0";
				// console.log(url)
			}
		}
		Fun_App.ExAjax("merchant/QRCode", sendData);
		return url;
	}
})
=======
mui.plusReady(function() {
	var qrCodeSrc = Fun_App.getdata("qrCodeSrc");
	var qrCodeBox = document.getElementById("qrcode");
	
	//本地加载二维码效果
	setTimeout(function() {
		if(qrCodeSrc == null || qrCodeSrc == "null") {
			var qrcode = new QRCode(qrCodeBox, {
				width: qrCodeBox.clientHeight,
				height: qrCodeBox.clientWidth
			});
			qrcode.makeCode(qrCode())
			qrCodeBox.querySelector("img").onload = function() {
				var src = qrCodeBox.querySelector("img").getAttribute("src")
				Fun_App.storagedata("qrCodeSrc", src)
				document.querySelector("#qrcodeLogo").style.display = "block";
			}
		} else {
			var img = document.createElement("img");
			img.setAttribute("src", qrCodeSrc);
			qrCodeBox.appendChild(img);
			qrCodeBox.querySelector("img").style.display = 'block';
			document.querySelector("#qrcodeLogo").style.display = "block";
		}
		document.querySelector("#qrcodeLogo").style.display = "block";
	}, 0);

	setTimeout(getindexData(), 0)
})

function getindexData() {
	var myMoneyCodeBox = document.querySelector("#myMoneyCode"), //收款码
		logoImgBox = document.querySelector("#logoImg"),
		merchantNameBOx = document.querySelector("#merchantName");
	logoImgBox.src = Fun_App.getdata("shopLogo");
	var senddata = {
		config: {
			"token": Fun_App.getdata("token")
		},
		fun_Success: function(data) {
			merchantNameBOx.innerText = data.data.merchantName + '(' + data.data.merchantAddress + ')';
			//myMoneyCodeBox.setAttribute("src", picservice + data.data.receiptCode)
		}
	}
	Fun_App.ExAjax("merchant/index", senddata);
}

function qrCode() {
	var url;
	var sendData = {
		config: {
			"token": Fun_App.getdata("token")
		},
		fun_Success: function(data) {
			url = data.data.url;

		}
	}
	Fun_App.ExAjax("merchant/QRCode", sendData);
	return url;
}
>>>>>>> 5364d9569539cb1231114c2af6ab18bbe1a1cf64
