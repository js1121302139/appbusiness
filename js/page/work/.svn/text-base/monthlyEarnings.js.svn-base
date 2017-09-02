var countMonyBox = document.querySelector("#countMony"),
    moneyListBox = document.querySelector("#moneyList"),
    monthBtnBOx = document.querySelector("#monthBtn"),
    MouthListBox = document.querySelector(".MouthList"),
    optionMonth = new Date().getMonth(),
    jtBox = null,
    totalPage = 0;
(function (mui) {
    mui.init({});

    //点击时更改样式显示月份列表
    tapState = false;
    monthBtnBOx.addEventListener("tap", function () {
        jtBox = this.querySelector(".jt");
        if (tapState) {
            jtBox.style.transform = "rotate(-360deg)"
            MouthListBox.style.top = '132.5rem';
            tapState = false;
        } else {
            MouthListBox.style.top = '3.9rem';
            jtBox.style.transform = "rotate(-180deg)"
            tapState = true;
        }
    })
    //点击某月查询某月的数据
    mui(".MouthList li").each(function (i, item) {
        item.addEventListener("tap", function () {
            optionMonth = i;
            document.querySelector("#monthTxt").innerText = this.innerText;
            jtBox.style.transform = "rotate(-360deg)"
            MouthListBox.style.top = '132.5rem';
            tapState = false;
            moneyListBox.innerHTML = "";
            getMonthincomeData(1, optionMonth)
        })
    })
    var page = 1;

    function pullupRefresh() {
        ++page;
        getMonthincomeData(page, optionMonth);
        this.endPullupToRefresh(page > totalPage)
        return;
    }

    
    mui.plusReady(function () {
        getMonthincomeData(page, optionMonth);
    })
}(mui))