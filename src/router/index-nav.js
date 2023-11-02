import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../components/nav/login.vue'
import Main from '../components/nav/main.vue'

//3．创建路由的实例对象
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: '/main',
      component: Main
    }
  ],
});
// 路由前置守卫
router.beforeEach((to, from ,next) => {
  console.log('to:', to)
  console.log('from:', from)
  if(to.path === '/main') {
    // 你想进入后台管理系统那么我就得检查你有没有权限（在线状态就有权限反之没有权限）
    const token = localStorage.getItem('token')
    // 如果token值存在就证明你小子在线就可以正常放行
    if (token) {
      next()
    } else {
      // 你小子不在线就不能放行
      next('/')
    }
  } else {
    // 放行
    next()
  }

})
export default router;
