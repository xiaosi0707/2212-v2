<template>
  <div class="box">
    <button @click="isShow = !isShow">出现/消失</button>
    <transition-group :appear="true">
      <p v-show="isShow" key="1">内容1</p>
      <p v-show="isShow" key="2">内容2</p>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true
    }
  }
}
</script>
<style scoped>
.box p {
  width: 100px;
  height: 100px;
  background: orange;
}

/* enter */
.v-enter, .v-leave-to { /* 起始状态 */
  transform: translateX(-100px);
}
.v-enter-to, .v-leave { /*结束状态*/
 transform: translateX(0);
}
.v-enter-active {
  transition: 1s linear;
}
.v-leave-active {
  transition: 2s ease-in;
}




</style>