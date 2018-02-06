Page({
    data: {
        windowHeight:0,
        condition:false
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
    onReachBottom:function(){
        console.log(1)
    },
    onLoad:function(){

    }
})