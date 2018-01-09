mui.init()

// 获取顶部的tab菜单
var balanceAnalysisBox = document.querySelector("#balanceAnalysis"),
	shareAnalysisBox = document.querySelector("#shareAnalysis");

// 基于准备好的dom，初始化echarts实例
(function(mui) {
	var balanceAnalysis = {
			day: [],
			dayIncome: [],
			week: [],
			weekIncome: [],
			month: [],
			monthIncome: [],
		}, //营业收入
		shareAnalysis = {
			day: [],
			dayIncome: [],
			week: [],
			weekIncome: [],
			month: [],
			monthIncome: [],
		}; //共享收益
	var myChart = echarts.init(document.getElementById('main'));

	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '日视图'
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: false
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: false
				}
			}
		},
		tooltip: {},
		legend: {
			data: ['收益']
		},
		xAxis: {
			data: []
		},
		yAxis: {},
		series: [{
			name: '收益',
			type: 'line',
			data: []
		}],

	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	var TabClass = "balanceAnalysis"; //存储当前选折的项目类型默认类型是balanceAnalysis
	mui("#segmentedControl1").on("tap", ".mui-control-item", function() {
		TabClass = this.getAttribute("id");
		if(TabClass == "balanceAnalysis") {
			option.series.data = balanceAnalysis.dayIncome;
			option.xAxis[0].data = balanceAnalysis.day;
			myChart.setOption(option);
		} else {
			option.xAxis.data = shareAnalysis.day;
			option.series[0].data = shareAnalysis.dayIncome;
			console.log(option.series.data)
		}
		myChart.setOption(option);
	});
	//点击加载当前的数据
	mui("#segmentedControl2").on("tap", ".mui-control-item", function() {
		var tit = this.innerText,
			titIdBox = this.getAttribute("id");

		switch(titIdBox) {
			case "day":
				option.title.text = tit;
				/*option.xAxis.data=TabClass.*/
				if(TabClass == "balanceAnalysis") {
					option.series.data = balanceAnalysis.dayIncome;
					option.xAxis[0].data = balanceAnalysis.day;
					myChart.setOption(option);
				} else {
					option.xAxis.data = shareAnalysis.day;
					option.series[0].data = shareAnalysis.dayIncome;
					console.log(option.series.data)
				}
				break;
			case "week":
				option.title.text = tit;
				if(TabClass == "balanceAnalysis") {
					option.xAxis.data = balanceAnalysis.week;
					option.series[0].data = balanceAnalysis.weekIncome;
				} else {
					option.xAxis.data = shareAnalysis.week;
					option.series[0].data = shareAnalysis.weekIncome;
				}
				break;
			case "month":
				option.title.text = tit;
				if(TabClass == "balanceAnalysis") {
					option.xAxis.data = balanceAnalysis.month;
					option.series[0].data = balanceAnalysis.monthIncome;
				} else {
					option.xAxis.data = shareAnalysis.month;
					option.series[0]
					option.series[0].data = shareAnalysis.monthIncome;
				}
				break;
		}
		myChart.setOption(option);
	});

	function getincomeData() {
		var sendData = {
			config: {
				"token": Fun_App.getdata("token")
			},
			fun_Success: function(a) {
				if(a.success) {
					for(i in a.data) {
						if(i === 'shareAnalysis') {
							for(j in a.data[i]) {
								switch(j) {
									case "day":
										for(k in a.data[i][j]) {
											/*for(l in a.data[i][j][k]) {
												console.log(a.data[i][j][k][l])
												
											}*/
											shareAnalysis.day.push(a.data[i][j][k].sort)
											shareAnalysis.dayIncome.push(a.data[i][j][k].money)
											/*console.log(a.data[i][j][k].sort)*/
										}
										break;
									case "week":
										for(k in a.data[i][j]) {
											shareAnalysis.week.push(a.data[i][j][k].sort)
											shareAnalysis.weekIncome.push(a.data[i][j][k].money)
										}
										break;
									case "month":
										for(k in a.data[i][j]) {
											shareAnalysis.month.push(a.data[i][j][k].sort)
											shareAnalysis.monthIncome.push(a.data[i][j][k].money)
										}
										break;
								}
							}
						} else {
							for(j in a.data[i]) {
								switch(j) {
									case "day":
										for(k in a.data[i][j]) {
											/*for(l in a.data[i][j][k]) {
												console.log(a.data[i][j][k][l])
												
											}*/
											balanceAnalysis.day.push(a.data[i][j][k].sort)
											balanceAnalysis.dayIncome.push(a.data[i][j][k].money)
											/*console.log(a.data[i][j][k].sort)*/
										}
										break;
									case "week":
										for(k in a.data[i][j]) {
											balanceAnalysis.week.push(a.data[i][j][k].sort)
											balanceAnalysis.weekIncome.push(a.data[i][j][k].money)
										}
										break;
									case "month":
										for(k in a.data[i][j]) {
											balanceAnalysis.month.push(a.data[i][j][k].sort)
											balanceAnalysis.monthIncome.push(a.data[i][j][k].money)
										}
										break;
								}
							}
						}

					}
				}
			}
		}
		Fun_App.ExAjax("merchant/analysis", sendData);
	}
	mui.plusReady(function() {
		getincomeData()
	})

}(mui))