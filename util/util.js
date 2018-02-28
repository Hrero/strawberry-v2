

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([minute, second]).map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
  }).join(':')

  // return ([hour, minute, second]).map(function (n) {
  //   n = n.toString()
  //   return n[1] ? n : '0' + n
  // }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

/*获取当前页url*/
function getCurrentPageUrl(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length-1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for(var key in options){
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)

    return urlWithArgs
}

//调取小程序登录
function loginInover(){
    let self = this;

    wx.login({   //登录
        success: function(res) {
            var app = getApp();

            wx.request({   //判断当前状态
                // url: wepy.$instance.data.servsers+'/wechatappAction/getWxSessionKey?code='+wepy.$instance.data.code,
                url: app.globalData.servsers+'/wechatappAction/getWxSessionKey?code='+ res.code,
                success: function(res) {

                    if( res.data.success == true ) {

                        let sessionKey = JSON.parse(res.data.result.data).session_key;
                        if (sessionKey) {  //拿到sessionKey
                            wx.getUserInfo({
                                success: function (res) {
                                    let userInfo = res.userInfo;
                                    let nickName = userInfo.nickName;
                                    let avatarUrl = userInfo.avatarUrl;
                                    let encryptedData = res.encryptedData;
                                    let iv = res.iv;
                                    wepy.$instance.data.userInfo.nickName = nickName;
                                    wepy.$instance.data.userInfo.avatarUrl = avatarUrl;

                                    wx.request({   //拿uninid
                                        url: app.globalData.servsers + '/wechatappAction/getAppUser',
                                        data:{
                                            encryptedData:encryptedData,
                                            sessionKey:sessionKey,
                                            iv:iv
                                        },
                                        success: function (e) {

                                            if (e.data.success) {
                                                let data = JSON.parse(e.data.result.data);

                                                if (data.openId && data.unionId) {

                                                    wx.request({  //登录后台
                                                        url: app.globalData.servsers + '/wechatappAction/login',
                                                        data: {
                                                            unionid: data.unionId,
                                                            openid: data.openId,
                                                            nickName: wepy.$instance.data.userInfo.nickName,
                                                            avatarUrl: wepy.$instance.data.userInfo.avatarUrl
                                                        },
                                                        success: function (e) {

                                                            let sessionId = e.data.result.data;
                                                            wepy.$instance.data.header.Cookie = 'JSESSIONID=' + sessionId;

                                                            wx.request({   //判断当前状态
                                                                url: app.globalData.servsers + '/courseAction/appIndex',
                                                                header: wepy.$instance.data.header,
                                                                success: function (res) {

                                                                    if (res.data.success == true) {
                                                                        let data = res.data.result.data;

                                                                        jumpSomePage(data)
                                                                    } else {
                                                                        console.log('服务器繁忙')
                                                                    }


                                                                },
                                                                fail: function () {
                                                                    console.log('获取当前状态失败')
                                                                }
                                                            })
                                                        },
                                                        fail: function () {
                                                            console.log('登录后台失败')
                                                        }
                                                    })

                                                } else {
                                                    console.log('获取openid失败')
                                                }


                                            } else {
                                                console.log(e.data.msg)
                                            }


                                        }
                                    })

                                },
                                fail: function () {
                                    repeatGetLogin()
                                }
                            })

                        }else{
                            console.log('服务器繁忙')
                        }
                    }

                },
                fail:function(){
                    console.log('获取当前状态失败')
                }
            })

        }
    })

}

function repeatGetLogin(){
    let self = this;
    wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success:function(res){
            if (res.confirm){

                wx.openSetting({
                    success: (res) => {
                        if (res.authSetting["scope.userInfo"]){////如果用户重新同意了授权登录
                            loginInover()
                        }
                    },fail:function(res){
                    },complete:function(res){
                        if( !res.authSetting["scope.userInfo"] ){
                            repeatGetLogin()
                        }

                    }
                })

            }else if (res.cancel) {
                repeatGetLogin()
            }
        }
    })
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


module.exports = {
  formatTime: formatTime,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  loginInover:loginInover,
  formatLocation: formatLocation
}
