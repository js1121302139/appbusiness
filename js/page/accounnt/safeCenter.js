mui.init()
	(function(mui) {
		var pages = {
			".myLogin": {
				page: "safelogin",
			},
			".myPlay": {
				page: "safepay"
			},
		/*	".myWecath": {
				page: "bindWeixin"
			},*/
			".myBankCard": {
				page: "bindBankCard"
			}
		};
		Fun_App.openWinS(pages)
	}(mui))