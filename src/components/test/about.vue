<template>
  <div>
    <p>关于我们</p>
    <!-- 子级路由链接 -->
    <router-link to="/about" exact>公司简介</router-link>
    <router-link to="/about/progress">发展历程</router-link>
    <hr>
    <!--子级路由占位符 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {}

</script>
