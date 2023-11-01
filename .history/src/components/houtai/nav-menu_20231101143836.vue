<!-- components/nav-menu.vue -->
<template>
    <div class="left">
      <ul v-for="item in list" :key="item.id">
        <li><router-link to="">{{ item.content }}</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        list: [
          { id: 1, path: 'users', content: '用户管理' },
          { id: 2, path: 'rights', content: '权限管理' },
          { id: 3, path: 'goods', content: '商品管理' },
          { id: 4, path: 'order', content: '订单管理' },
          { id: 5, path: 'settings', content: '系统设置' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .left {
    flex: 0 0 20%;
    text-align: center;
    height: 100%;
    background-color: #545c64;
  }
  .left a {
    color: white;
    text-decoration: none;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ul li {
    height: 45px;
    line-height: 45px;
    background-color: #a0a0a0;
    color: #fff;
    cursor: pointer;
    border-bottom: 1px solid #fff;
  }
  </style>