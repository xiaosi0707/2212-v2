// src/router/index.js就是当前项目的路由模块

//1．导入Vue 和VueRouter的包
import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../components/ceshi/list.vue'
import About from '../components/ceshi/about.vue'
import Send from '../components/ceshi/send.vue'
import Ented from '../components/ceshi/ented.vue'

//2．调用Vue.use()函数，把VueRouter安装为Vue的插件
Vue.use(VueRouter)

//3．创建路由的实例对象
const router = new VueRouter({
    routes: [
        
        {
            path:'/list',
            component:List
        },
        {
            path:'/about',
            component:About,
            children:[
                {
                    path:'/send',
                    component:Send
                },
                {
                path:'/send',
                component:Send
            },
            {
                path:'/ented',
                component:Ented
            }
               
            ]
        }
    ]
})

//4．向外共享路由的实例对象
export default router