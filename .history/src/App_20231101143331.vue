<template>
  <div id="app">
    <CustomHeader />  
    <router-view></router-view>
    <CustomFooter />
  </div>
</template>
<script>
import CustomHeader from './components/houtai/header.vue'
import CustomFooter from './components/houtai/footer.vue'
export default {
  components: {
    CustomHeader,
    CustomFooter
  }
}
</script>
<style>
.router-link-exact-active {
   color:red

}
</style>