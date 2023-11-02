<template>
    <div>
      <custom-header />
      <!-- nav -->
      <ul class="nav">
        <router-link tag="li" to="">商品</router-link>
        <router-link tag="li" to="">评价</router-link>
        <router-link tag="li" to="">商家</router-link>
      </ul>
      <!-- 二级路由 -->
  
        <router-view />
    </div>
  </template>
  
  <script>
  import customHeader from './header'
  export default {
    components: {
      customHeader
    }
  }
  </script>
  
  <style scoped>
  /* tab切换 */
  .nav {
    display: flex;
    height: .8rem;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: .28rem;
  }
  .nav li {
    flex: 1;
    line-height: .8rem;
    text-align: center;
  }
  .nav li.router-link-active {
    color: rgb(240, 20, 20);
  }
  </style>