Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
            observer: function(newVal, oldVal){}
        },
        innerCondition:{
            type: Boolean
        },
        chooseTitle:{
            type:String
        }
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
        windowHeight:'100%',
        innerCondition:false,
        chooseTitle:'暂不使用优惠券'
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function(){
            let that = this;
            that.setData({
                innerCondition:!that.data.innerCondition
            })
        },
        clickTicket:function(){
            wx.navigateTo({
                url: '/pages/choose/choose'
            })
        }
    },
    ready: function(e){
        // console.log(this)
    }
})