<template>
  <div class="child">
    <h2>我是子组件</h2>
    {{ formatProp }}
  </div>
</template>
<script>
export default {
  props: ['childTitle'],
  computed: {
    formatProp() {
      return this.childTitle.split('')
    }
  }
}

</script>
<style>
.child {

  background: pink;
  padding: 30px;
}

</style>
