(function(mui) {
	mui(document.body).on('tap', '.codeBtn', function(e) {
		mui(this).button('loading');
		setTimeout(function() {
			mui(this).button('reset');
		}.bind(this), 2000);
	});

	//打开绑定微信成功页面
	Fun_App.OpenPage('#bindSuccess', 'bindsuccess.html', 'pop-in', '');
})(mui);