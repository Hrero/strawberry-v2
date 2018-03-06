Page({
    data: {
        windowHeight:0,
        condition:false,
        btn:true,
        dataPrev:[
            {
                jia:10,
                man:23,
                sign:1,
                new:'新手福利',
                des:'指定商品可用',
                time:'2017.10.23 — 2017.11.23'
            },
            {
                jia:11,
                man:23,
                sign:1,
                new:'新手福利',
                des:'指定商品可用',
                time:'2017.10.23 — 2017.11.23'
            },
            {
                jia:12,
                man:23,
                sign:2,
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
    wei(){
        let that = this;
        that.setData({
            btn:true
        })
    },
    yi(){
        let that = this;
        that.setData({
            btn:false
        })
    },
    clickBuy:function(){
        let that = this;

        that.setData({
            condition:!that.condition
        })

    },
    Gocurriculum:function(e){
        wx.navigateTo({
            url: '/pages/coupon/coupon'
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