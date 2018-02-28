Page({
    data: {
        windowHeight:0,
        condition:false,
        dataPrev:[
            {
                jia:10,
                man:23,
                new:'新手福利',
                des:'指定商品可用',
                time:'2017.10.23 — 2017.11.23'
            },
            {
                jia:11,
                man:23,
                new:'新手福利',
                des:'指定商品可用',
                time:'2017.10.23 — 2017.11.23'
            },
            {
                jia:12,
                man:23,
                new:'新手福利',
                des:'指定商品可用',
                time:'2017.10.23 — 2017.11.23'
            }
        ]
    },
    taplabel:function(e){
        let that = this;
        that.setData({
            tapLabelIndex:e.target.dataset.index
        })
    },
    clickBuy:function(){
        let that = this;

        that.setData({
            condition:!that.condition
        })

        console.log(1)
    },
    Gocurriculum:function(e){

        var pages = getCurrentPages();
        console.log(pages,e.currentTarget.dataset.title)
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面

        prevPage.setData({
            chooseTitle:e.currentTarget.dataset.title
        })

        wx.navigateBack({
            delta: 1
        })
    },
    lineH(){
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面

        prevPage.setData({
            chooseTitle:'暂不使用优惠券'
        })

        wx.navigateBack({
            delta: 1
        })

    },
    onReachBottom:function(){
        console.log(1)
    },
    onLoad:function(){

    }
})