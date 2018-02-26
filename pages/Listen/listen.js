var formatTime = require('../../util/util.js').formatTime
var app = getApp();

let globalBgAudioManager = wx.getBackgroundAudioManager();

Page({
    data: {
        backgroundAudioManager:{},
        totalProcess:0,    //右值
        currentProcess:0,    //左值
        sliderMax:0,        //最大值
        sliderValue:0     //当前值
    },
    Gocurriculum(){
        wx.navigateTo({
            url: '/pages/curriculum/curriculum'
        })
    },
    outlineOperation(e) {     // 点击播放按钮

        this.playTargetAudio();

    },
    /**
     * 点击／自动播放 目标音频
     * @param {*Number} targetAudioId
     * - 检查是否点击到同一个音频
     * - 检查是否完全播放完毕
     * - 若未播放完毕，或者点击的不是同一个音频，先暂停当前音频
     * - 执行音频播放操作
     */
    playTargetAudio() {
        const that = this;
        console.log(globalBgAudioManager.paused)
        // 若未暂停，则先暂停
        if (!globalBgAudioManager.paused) {
            globalBgAudioManager.pause();
        }else{
            globalBgAudioManager.play();
        }

    },
    hanleSliderChange:function(e){   // 响应拖动事件
        const position = e.detail.value;
        console.log(position)
        this.seekCurrentAudio(position);
    },
    seekCurrentAudio(position) {     // 更新进度条

        const that = this;

        globalBgAudioManager.seek(Math.floor(position));

    },
    onPrev(){     //点击播放上一首

        let that = this;
        globalBgAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46';
        globalBgAudioManager.title = '许巍'
        globalBgAudioManager.onTimeUpdate(that.onTimeUpdate)

    },
    onNext(){

        let that = this;

        globalBgAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46';
        globalBgAudioManager.title = '林更新'
        globalBgAudioManager.onTimeUpdate(that.onTimeUpdate)

    },
    onTimeUpdate(){   //进度条更新事件

        const that = this;

        var sliderMax = Math.ceil(globalBgAudioManager.duration)   //最大时间秒

        var sliderValue = Math.ceil(globalBgAudioManager.currentTime)  //当前时间秒

        var totalProcess = formatTime(sliderMax-sliderValue)   //剩余时间

        var currentProcess = formatTime(sliderValue)   //转化时间格式

        that.setData({ sliderMax, sliderValue,totalProcess,currentProcess})

    },
    initBgAudioListManager() {

        const that = this;

        globalBgAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
        globalBgAudioManager.title = '测试用'
        globalBgAudioManager.onTimeUpdate(that.onTimeUpdate)

    },
    onShow() {

        var that = this;

    },
    onLoad(){

        var that = this;

        that.initBgAudioListManager();

    }
})