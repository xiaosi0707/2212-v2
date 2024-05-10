<template>
  <el-form :model="form" ref="loginForm" :rules="rules" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="wyf-btn-login" @click="login">登16陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          /*
            required: true 必填（不能为空）
            message: 为空的时候的提示语
            trigger：触发方式（jQuery -> trigger(click)）
            min：最小长度
            max：最大长度

           */
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /*
     * 登陆业务需求：
     * 1. 获取用户输入的用户名和密码
     * 2. 点击“登陆”按钮发送http请求，然后把用户名和密码通过接口传送给给后端
     * 3. 后端拿到前端传递过来的用户名和密码到数据库中校验
     * 4. 校验是否有该用户名的存在，如果存在那么继续校验密码是否正确
     * 5. 后端校验完毕给前端返回校验后的结果
     * 登陆功能实现：
     * 1. 我们需要先给登陆按钮添加点击事件并且绑定回调函数
     * 2. 点击登录按钮发送http请求把用户名和密码发送给服务端
     * 3. 根据服务端响应的数据然后做相应的处理
     * 4. 成功的处理
     *     4.1 给予成功提示
     *     4.2 把token存在本地存储中
     *     4.3 跳转到后台管理系统的主页
     * 5. 错误的处理
     *     5.1 给予错误的提示
     *     5.2 清空token
     *     5.3 留在登录页
     *
     * */
    login() {
      this.$refs.loginForm.validate((valid) => {
        console.log('校验：', valid)
        // 如果校验通过了也就是valid为true了
        if (valid) {
          this.$http.post('login', {
            username: this.form.username,
            password: this.form.password
          }).then(res => {
            console.log('后端响应给前端的数据：', res)
            // 状态码===200就是成功了
            if (res.data.meta.status === 200) {
              // 把token存储在本地存储中
              localStorage.setItem('token', res.data.data.token)
              // 跳转到后台管理系统的主页
              this.$router.push('/main')
            } else {
              // 清空token
              localStorage.removeItem('token')
            }
          })
        }
      })

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
