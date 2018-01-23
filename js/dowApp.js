function DOWAPP() {
	mui.plusReady(function() {
		plus.downloader.createDownload('http://f.hiphotos.baidu.com/image/pic/item/503d269759ee3d6db032f61b48166d224e4ade6e.jpg', {
			filename: "_downloads/DOWAPP/",
			priority: 2,
			timeout: 10000,
			retry: 3,
		}, function(e) {
			console.log(e)
		})
	})

}