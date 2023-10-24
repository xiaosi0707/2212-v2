export default {
  install(vue, options) {
    console.log(options)
    vue.filter('UpperCase', val => {
      return val.toUpperCase()
    })
    vue.prototype.$myAttr = '我是插件的属性'
    vue.prototype.$myfn = function() {
      // 逻辑
      console.log('我是插件的方法')
    }
     // 添加全局指令
        vue.directive('focus',{
            inserted:function(el){
                el.focus()
            }
        })
  }
}
