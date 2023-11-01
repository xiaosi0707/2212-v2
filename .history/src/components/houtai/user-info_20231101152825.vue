<!-- components/userinfo.vue -->
<template>
  <div>
    <h5>用户详情页 --- 用户ID为：{{ userId }}</h5>
    <button @click="goBack">后退</button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            userId: ''
        }
    },
  created() {
    this.userId = this.$route.query.id
    
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
button {
  height: 30px;
  background-color: #ecf5ff;
  border: 1px solid lightskyblue;
  font-size: 12px;
  padding: 0 20px;
}
</style>
