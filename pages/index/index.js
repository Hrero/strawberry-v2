Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        indexLabelOption:['人气推荐','火热招商','火热招商','火热招商','火热招商','火热招商','啦啦啦啦'],
        tapLabelIndex:0
    },
    taplabel:function(e){
        let that = this;
        that.setData({
            tapLabelIndex:e.target.dataset.index
        })
    },
    onReachBottom:function(){
console.log(1)
    }
})