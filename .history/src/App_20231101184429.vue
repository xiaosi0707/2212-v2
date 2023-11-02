<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view />    
  </div>
</template>

<style>
/* 公共样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
/* 去掉图片间隙 */
img {
  vertical-align: top;
}
html {
  font-size: 13.3333vw;
}
</style>