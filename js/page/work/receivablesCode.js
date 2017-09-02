mui.plusReady(function() {
	var qrCodeBox = document.getElementById("qrcode");
	var qrcode = new QRCode(qrCodeBox, { 
		width: qrCodeBox.clientHeight,
		height: qrCodeBox.clientWidth
	});
	getindexData();
	qrcode.makeCode(qrCode());
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
	