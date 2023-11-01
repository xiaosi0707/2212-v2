<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>
<script>
import CustomHeader from './components/houtai/header.vue'
import CustomFooter from './components/houtai/footer.vue'
export default {
  components: {
    CustomHeader,
    Cus
  }
}
</script>
<style>
.router-link-exact-active {
   color:red

}
</style>