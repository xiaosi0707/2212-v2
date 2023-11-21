import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Login from '../views/login.vue'
import Main from '../views/main.vue'
import Users from '../views/users.vue'
import Roles from '../views/roles.vue'
import Goods from '../views/goods.vue'
import GoodsAdd from '../views/goods-add.vue'
import Params from '../views/params.vue'
import Cate from '../views/cate.vue'
import Reports from '../views/reports.vue'

//3．创建路由的实例对象
const router = new VueRouter({
  routes: [{
      path: "/",
      component: Login,
    },
    {
      path: '/main',
      component: Main,
      children: [{
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/add',
          component: GoodsAdd
        },
         {
          path: '/params',
          component: Params
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/reports',
          component: Reports
        }
      ]
    }
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path === "/main") {
    let a = localStorage.getItem('token')
    if (a) {
      next()
    } else {
      next('/')
    }
  }
  next()
})
export default router;
