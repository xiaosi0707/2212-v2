import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Parent from '../views/com/parent.vue'

const router = new VueRouter({
  routes: [{
    path: '/parent',
    component: Parent
  }],
});

export default router;
