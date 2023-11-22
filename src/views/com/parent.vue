<template>
  <div class="parent">
    <h1>父组件</h1>
    {{ title }}
    <hr>
    <Child :child-title="title" />
  </div>
</template>
<script>
import Child from './child.vue'
export default {
  components: {
    Child
  },
  data() {
    return {
        title: '北昌教育'
    }
  },

}

</script>
<style>
.parent {
  width: 420px;
  background: orange;
  padding: 30px;
}

</style>
