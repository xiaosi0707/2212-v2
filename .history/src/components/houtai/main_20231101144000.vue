<template>
  <div class="main">
    <div class="content right">
      <div class="main-content">
        Nav
      </div>
    </div>
  </div>
</template>
<script>
import NavMenu from "./nav-menu.vue";
export default {
  components: {
    NavMenu,
  },
};
</script>
<style scoped>
.main {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 40px;
  width: 100%;
}
.content {
  flex: 1;
  text-align: center;
  height: 100%;
}
.right {
  margin: 5px;
}
.main-content {
  margin-top: 10px;
}
</style>
