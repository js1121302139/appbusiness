var Calendar = function() {
	this.DateTime = new Date();
	this.year = this.DateTime.getFullYear();
	this.mouth = this.DateTime.getMonth();
	this.Day = this.DateTime.getDay();
	this.yearArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	this.mouthArr = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
	this.MouthOneday = new Date();
	this.isLeapYear = function(year) {
		return(year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
	};
	//设置每月的第一天
	this.setMonthOnDay = function(mouth) {
		this.mouth = mouth;
		this.nextYear = this.year;
		this.MouthOneday.setMonth(this.mouth - 1);
		this.MouthOneday.setDate(1);
//		console.log(this.mouth)
//		console.log(this.MouthOneday.getFullYear())
		return {
			M: this.mouth,
		};
	}
	//绘制日历
	/*
	 *{"dateYear":2017,"dateMouth":7}
	 * */
	this.renderMouthList = function(dateObj, dataObj) {
		this.mouth = this.setMonthOnDay(dateObj.dateMouth).M;
		var Week = this.MouthOneday.getDay();
		var mouthlistBox = document.querySelector("#dayLsit");
		mouthlistBox.innerHTML = "";
		var preMouth = this.yearArr[(this.mouth - 1)] - Week;
		var headerMBox = document.querySelector("#headerM");
		headerMBox.innerText =dateObj.dateYear+"年"+ dateObj.dateMouth + "月";
		for(var i = 0; i < Week; i++) {
			++preMouth;
			mouthlistBox.innerHTML += '<div class="dayList-item preDay" isActive="N"  activeDay="' + dateObj.dateYear + '-' + ((this.mouth <= 9) ? "0" + this.mouth - 1 : this.mouth - 1) + '-' + (preMouth) + '">' + (preMouth) + '</div>';
		}
		for(var i = 1; i <= this.yearArr[this.mouth - 1]; i++) {
			mouthlistBox.innerHTML += '<div class="dayList-item" isNowMouth="Y" isActive="N" activeDay="' + dateObj.dateYear + '-' + ((this.mouth <= 9) ? "0" + this.mouth : this.mouth) + '-' + ((i <= 9) ? "0" + i : i) + '">' + ((i <= 9) ? "0" + i : i) + '</div>';
		}
		
	};
}

var Calendardate = new Calendar();
Calendardate.renderMouthList(null);