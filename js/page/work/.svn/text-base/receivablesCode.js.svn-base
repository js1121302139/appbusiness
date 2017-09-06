mui.plusReady(function() {
	var qrCodeSrc = Fun_App.getdata("qrCodeSrc");
	var qrCodeBox = document.getElementById("qrcode");
	var qrcode = new QRCode(qrCodeBox, {
		width: qrCodeBox.clientHeight,
		height: qrCodeBox.clientWidth
	});
	//异步加载二维码效果还不错
	setTimeout(function() {
		if(qrCodeSrc == null) {
			console.log(qrcode.makeCode(qrCode()));
		} else {
			qrCodeBox.querySelector("canvas").style.display = 'none';
			qrCodeBox.querySelector("img").setAttribute("src", qrCodeSrc);
			qrCodeBox.querySelector("img").style.display = 'block';

		}
	}, 0);
	
	setTimeout(getindexData(), 2000)
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