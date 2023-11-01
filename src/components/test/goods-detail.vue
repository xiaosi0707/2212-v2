<template>
  <div>详情页</div>
</template>
<script>
export default {
  props: ['id', 'title', 'price'], // 接收传递过来的参数
  created() {
    console.log(this.id, this.title, this.price)
  }
}
</script>