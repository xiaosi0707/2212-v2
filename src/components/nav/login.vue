<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="wyf-btn-login" @click="login">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    /*
    * 登陆：
    *   1. 如何拿到用户输入的用户名？
    *
    * */
    login() {
      // 用户名和密码正确就登录成功
      if(this.form.username === 'admin' && this.form.password === '123456') {
        // 把获取到的token值存到本地存储
        localStorage.setItem('token', '23h5j23jhj25hj25hj32h5j3h5h23j5h3h5j3j5hj3')
        // 登陆成功的提示
        this.$message.success('登陆成功')
        // 跳转到后台管理系统的主页
        this.$router.push('/main')
      } else {
        // 清空本地存储的数据
        localStorage.removeItem('token')
        // 给予错误的提示
        this.$message.error('用户名或密码错误')
      }
    }
  }
}
</script>
<style scoped>
.el-form {
  width: 560px;
  margin: 120px auto;
}
.wyf-btn-login {
  width: 100%;
}
</style>
