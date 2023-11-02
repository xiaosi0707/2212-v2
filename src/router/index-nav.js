import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../components/nav/login.vue'
import Main from '../components/nav/main.vue'
import Person from '../components/nav/person.vue'

//3．创建路由的实例对象
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/main',
      component: Main,
      meta: {
        title: '欢迎进入后台管理系统主页'
      }
    },
    {
      path: '/person',
      component: Person,
      meta: {
        vip: !true
      },
      beforeEnter: (to, from, next) => {
        if(to.meta.vip) {
          next()
        } else {
          next('/')
        }
      }
    }
  ],
});
export default router;
