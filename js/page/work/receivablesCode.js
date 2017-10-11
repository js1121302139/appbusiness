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