<template>
  <div id="app">
    <!-- 一级路由 -->
   
      <router-view />
   
  </div>
</template>
<style>
html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
/* 进入动画 */
.v-enter { /*初始状态*/
  transform: translateX(-1500px);
}
.v-enter-active {
  transition: 1s linear 1s;
}
.v-enter-to {
  transform: translateX(0);
}
/* 离开动画 */
.v-leave { /*初始状态*/
  transform: translateX(0);
}
.v-leave-active {
  transition: 0.5s linear;
}
.v-leave-to {
  transform: translateX(1500px);
}
</style>
