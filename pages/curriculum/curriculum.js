Page({
    data: {
        windowHeight:0,
        condition:false,
        isShow:false,
        chooseTitle:'暂不使用优惠券'
    },
    taplabel(e){
        let that = this;
        that.setData({
            tapLabelIndex:e.target.dataset.index
        })
    },
    clickBuy(){

        let that = this;

        that.setData({
            condition:!that.condition
        })

        // console.log(1)
    },
    GoListenPage(){
        wx.navigateTo({
            url: '/pages/listen/listen'
        })
    },
    onReachBottom(){
        // console.log(1)
    },
    onShowDownDes(){
        let that = this;
        that.setData({
            isShow:true
        })
    },
    onLoad(){

    }
})