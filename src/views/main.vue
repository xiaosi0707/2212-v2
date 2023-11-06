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
              <el-input placeholder="请输入内容"  style="width: 32%; margin-right: 10px;">
                <template slot="append">
                  <i class="el-icon-search"></i>
                </template>
              </el-input>
               <el-button type="primary">添加用户</el-button>
            </span>
          </div>
          <div  class="text item">
            <el-table
              :data="usersData"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="id"
                width="50">
              </el-table-column>
              <el-table-column
                prop="username"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="电话">
              </el-table-column>
              <el-table-column
                prop="role_name"
                label="角色">
              </el-table-column>
              <el-table-column
                prop="mg_state"
                label="状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.mg_state"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <!-- 表格 -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Axios from 'axios'
export default {
  data() {
    return {
      usersData: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    // 请求用户列表的接口
    Axios.get('http://shiyansong.cn:8888/api/private/v1/users', {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 配置请求头，携带token给服务端，让偶服务端认识我给我要的数据
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    },).then(res => {
      console.log(res)
      let { users } = res.data.data
      this.usersData = users
    })
  }
}
</script>
<style>
.el-header, .el-footer {
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

body > .el-container {
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
