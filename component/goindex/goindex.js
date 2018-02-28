Component({
    properties: {
    },
    methods: {
        // 这里是一个自定义方法
        goindex: function(){
            wx.switchTab({
                url: '/pages/index/index'
            })
        }
    },
    ready: function(e){
        // console.log(this)
    }
})