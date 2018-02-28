// const openIdUrl = require('./config').openIdUrl
var vendor = require('./util/util');


App({
  onLaunch: function () {

    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    vendor.loginInover()
    // console.log(this.backgroundAudioManager,'------',wx)

    // this.courseAudioListManager = createCourseAudioListManager();

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    servsers:"https://m.caomei.i2plus1.com",
    userInfo:{
        nickName:null,
        avatarUrl:null
    },
    header:{'Cookie': ''}
  }

})
