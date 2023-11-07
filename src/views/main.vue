<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 -->
        <!-- 表格 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <el-input placeholder="请输入内容" v-model="usersParams.query" style="width: 32%; margin-right: 10px;">
                <template slot="append">
                  <i class="el-icon-search" @click="search"></i>
                </template>
              </el-input>
              <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
            </span>
          </div>
          <div class="text item">
            <el-table :data="usersData" border style="width: 100%">
              <el-table-column type="index" label="id" width="50">
              </el-table-column>
              <el-table-column prop="username" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="email" label="邮箱">
              </el-table-column>
              <el-table-column prop="mobile" label="电话">
              </el-table-column>
              <el-table-column prop="role_name" label="角色">
              </el-table-column>
              <el-table-column prop="mg_state" label="状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.mg_state">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOpen(scope.row.id)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.id)"></el-button>
                  <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- 表格 -->
      </el-main>
    </el-container>
    <!-- 添加用户的模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户的模态框 -->
    <!-- 编辑用户的模态框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的模态框 -->
  </el-container>
</template>
<script>
import Axios from 'axios'
export default {
  data() {
    return {
      // 收集编辑用户邮箱和手机号码
      editUserForm: {
        email: '',
        mobile: ''
      },
      // 当前被编辑的用户id
      editingUserId: '',
      // 编辑用户模态框的显示或隐藏
      editDialogFormVisible: false,
      usersData: [],
      /* 添加用户模态框 */
      // 添加用户模态框显示还是隐藏
      dialogFormVisible: false,
      // label的宽度 - 添加用户
      formLabelWidth: '100px',
      // 收集用户输入的数据（数据的数量大于一条就用对象或数组）
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 添加用户模态框 */
      // 请求用户列表的参数
      usersParams: {
        query: '',
        pagenum: 1,
        pagesize: 20
      }
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    // 编辑用户 - 打开模态框
    editOpen(userId) {
      // 把当前编辑的用户的id赋值给editingUserId
      this.editingUserId = userId
      // 打开编辑用户的模态框
      this.editDialogFormVisible = true
    },
    // 编辑用户
    edit() {
      
      // 请求编辑用户的接口
      /*
        @params id 请求路径中的参数path表示
        @params email 邮箱
        @params mobile 手机号
       */
      Axios.put(`http://shiyansong.cn:8888/api/private/v1/users/${this.editingUserId}`,
        this.editUserForm, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then( res => {
          console.log(res)
        })
    },
    // 搜索用户
    search() {
      Axios.get('http://shiyansong.cn:8888/api/private/v1/users', {
        params: this.usersParams,
        // 配置请求头，携带token给服务端，让偶服务端认识我给我要的数据
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => {
        console.log('搜索结果：', res)
        let { users } = res.data.data
        this.usersData = users
      })
    },
    // 请求用户列表
    getUserData() {
      // 请求用户列表的接口
      Axios.get('http://shiyansong.cn:8888/api/private/v1/users', {
        params: this.usersParams,
        // 配置请求头，携带token给服务端，让偶服务端认识我给我要的数据
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }, ).then(res => {
        console.log(res)
        let { users } = res.data.data
        this.usersData = users
      })
    },
    // 添加用户
    add() {
      // 关闭添加用户的模态框
      this.dialogFormVisible = false
      // 发送添加用户的http请求
      Axios.post(`http://shiyansong.cn:8888/api/private/v1/users`,
        this.addUserForm, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => {
        console.log('添加用户返回的数据：', res)
        // 成功的判断
        if (res.data.meta.status === 201) {
          this.$message.success(res.data.meta.msg)
          // 显示最新的添加的数据
          this.getUserData()
          return
        }
        // 错误的处理
        this.$message.error(res.data.meta.msg)
        // 再次调用请求用户列表的接口

      })
    },
    // 删除用户
    del(userId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        /*
         * @params id（你要删除的谁）？
         * */
        Axios.delete(`http://shiyansong.cn:8888/api/private/v1/users/${userId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then(res => {
          // 删除成功
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            });
            // 再次调用用户列表的接口（刷新数据）
            this.getUserData()
          } else {
            // 删除失败
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(userId)

    }
  }
}

</script>
<style>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// 卡片
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  margin-top: 24px;
}

</style>
