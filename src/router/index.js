import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/login.vue'
import Main from '../views/main.vue'

//3．创建路由的实例对象
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: '/main',
      component: Main,
    }
  ],
});
export default router;
