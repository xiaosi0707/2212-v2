import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/login.vue'
import Main from '../views/main.vue'
import Users from '../views/users.vue'
import Roles from '../views/roles.vue'

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
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        }
      ]
    }
  ],
});
// router.afterEach((to,from)=>{
//   console.log(to)
//   if(to.path=="/home"){
//     let {token} = localStorage.getItem(token)
//     if(token){
//
//     }else{
//       next('/')
//     }
//   }
// }),
  router.beforeEach((to,from,next)=>{
    console.log((to))
    if (to.path === "/main"){
      let a = localStorage.getItem('token')
      if (a){
        next()
      }else {
          next('/')
      }
    }
    next()
  })
export default router;
