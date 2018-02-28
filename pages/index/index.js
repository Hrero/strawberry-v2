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
        tapLabelIndex:0,
        dataJson:[
            {
                src:'/image/green_tri.png',
                title:'找到职场的人生拐点1',
                dis:'有的人一旦焦虑一旦焦虑，就会产，就会产生产，就会产生了拖延症，据201',
                date:'10',
                dy:'5',
                money:'49.9'
            },
            {
                src:'/image/green_tri.png',
                title:'找到职场的人生拐点2',
                dis:'有的人一旦焦虑一旦焦虑，就会产，就会产生产，就会产生了拖延症，据201',
                date:'10',
                dy:'5',
                money:'49.9'
            },
            {
                src:'/image/green_tri.png',
                title:'找到职场的人生拐点3',
                dis:'有的人一旦焦虑一旦焦虑，就会产，就会产生产，就会产生了拖延症，据201',
                date:'10',
                dy:'5',
                money:'49.9'
            },
            {
                src:'/image/green_tri.png',
                title:'找到职场的人生拐点4',
                dis:'有的人一旦焦虑一旦焦虑，就会产，就会产生产，就会产生了拖延症，据201',
                date:'10',
                dy:'5',
                money:'49.9'
            }
        ]
    },
    taplabel:function(e){
        let that = this;
        that.setData({
            tapLabelIndex:e.target.dataset.index
        })
    },
    Gocurriculum:function(){
        wx.navigateTo({
            url: '/pages/curriculum/curriculum'
        })
    },
    onReachBottom:function(){
console.log(1)
    },
    onLoad(){



    }
})