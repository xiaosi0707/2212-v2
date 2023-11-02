// src/router/index.js就是当前项目的路由模块

//1．导入Vue 和VueRouter的包
import Vue from "vue";
import VueRouter from "vue-router";

//2．调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter);
// 导入组件
import Main from './//Component Object
Component({
    properties: {
        myProperty:{
            type:String,
            value:'',
            observer: function(){}
        },

    },
    data: {

    },
    methods: {
        
    },
    created: function(){

    },
    attached: function(){

    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){

    },
});'
//3．创建路由的实例对象
const router = new VueRouter({
  routes: [],
});

//4．向外共享路由的实例对象
export default router;