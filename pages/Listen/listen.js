// var backgroundAudioManager = wx.getBackgroundAudioManager()
var formatTime = require('../../util/util.js').formatTime
var app = getApp();
let globalBgAudioManager = app.backgroundAudioManager;
const globalCourseAudioListManager = app.courseAudioListManager;

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
    outlineOperation(e) {     // 获取音频地址
        // // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
        const courseAudio = e.currentTarget.dataset.outline || {};
        const targetAudioId = courseAudio.audio_id;
        // 中间省略一系列合法性检查。
        this.playTargetAudio(targetAudioId);

    },
    /**
     * 点击／自动播放 目标音频
     * @param {*Number} targetAudioId
     * - 检查是否点击到同一个音频
     * - 检查是否完全播放完毕
     * - 若未播放完毕，或者点击的不是同一个音频，先暂停当前音频
     * - 执行音频播放操作
     */
    playTargetAudio(targetAudioId) {
        const currentAudio = globalCourseAudioListManager.getCurrentAudio();

        // 点击未停止的原音频的话，没必要响应
        if (targetAudioId === currentAudio.audio_id && !!globalBgAudioManager.currentTime) {
            return false;
        } else {
            this.getAudioSrc(targetAudioId).then(() => {

                // 若未暂停，则先暂停
                if (!globalBgAudioManager.paused) {
                    globalBgAudioManager.pause();
                }

                // 全局切换当前播放的音频index（此时还没有开始播放）
                globalCourseAudioListManager.changeCurrentAudioById(targetAudioId);

                // 更新当前控件状态，比如新音频的title和长度，总要更新吧。
                this.updateControlsInNewAudio();

                // 更换并且播放背景音乐
                globalBgAudioManager.changeAudio();
            });
        }
    },
    sliderchangeEnd:function(e){   //滑动结束之后触发的事件
        const position = e.detail.value;
        this.seekCurrentAudio(position);
    },
    seekCurrentAudio(position) {   // 拖动进度条控件

        // 更新进度条
        const page = this;
        // 音频控制跳转
        // 这里有一个诡异bug：seek在暂停状态下无法改变currentTime，需要先play后pause
        const pauseStatusWhenSlide = backgroundAudioManager.paused;
        if (pauseStatusWhenSlide) {
            globalBgAudioManager.play();
        }

    },
    onPrev(){     //点击暂停播放

    },
    initBgAudioListManager() {
        // options中的函数在执行的时候，this指向函数本身（亲测），因此这里需要保存Page对应的this。
        const page = this;
        const self = globalBgAudioManager;
        const options = {
            onWaiting() {
                wx.showLoading({
                    title: '音频加载中…'
                });
                globalBgAudioManager.isWaiting = true;
            },
            onTimeUpdate() {
                if (self.isWaiting) {
                    self.isWaiting = false;
                    setTimeout(() => {
                        wx.hideLoading();
                    }, 300);
                    // 设置300ms是为了避免某些音频加载过快而导致Loading效果一闪而过对用户造成糟糕的体验
                }
                // 以下代码省略
            },
            changeAudio() {    // 修改当前音频

                // 获取并且
                const { url, audio_id, title, content_type_signare_url } = globalCourseAudioListManager.getCurrentAudio();
                const { doctor, name, image } = globalCourseAudioListManager.courseInfo;
                self.title = title;
                self.epname = name;
                self.audioId = audio_id;
                self.coverImgUrl = image;
                self.singer = doctor.nickname || '丁香医生';

                // iOS使用content_type_signare_url
                const src = isIOS() ? content_type_signare_url : url;
                if (!src) {
                    showToast({
                        title: '音频丢失，无法播放',
                        icon: 'warn',
                        duration: 2000
                    });
                } else {
                    self.src = src;
                }
            }
        };

        // decorateBgAudioListManager函数，直接修改globalBgAudioManager对象，从而实现方法的拓展
        globalBgAudioManager = decorateBgAudioListManager(globalBgAudioManager, options);

    },
    onShow() {

        var that = this;

    },
    onLoad(){

        var that = this;

        that.initBgAudioListManager();

        // var backgroundAudioManager = wx.getBackgroundAudioManager();
        //
        // // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
        //
        // backgroundAudioManager.onTimeUpdate(function () {
        //
        //     var sliderMax = Math.ceil(backgroundAudioManager.duration)   //最大时间秒
        //
        //     var sliderValue = Math.ceil(backgroundAudioManager.currentTime)  //当前时间秒
        //
        //     var totalProcess = formatTime(sliderMax-sliderValue)   //剩余时间
        //
        //     var currentProcess = formatTime(sliderValue)   //转化时间格式
        //
        //     that.setData({ sliderMax, sliderValue,totalProcess,currentProcess})
        //
        //
        //
        // })

    }
})