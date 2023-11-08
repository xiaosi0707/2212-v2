<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
          <!-- 左侧菜单布局 - start -->
          <!-- el-menu最大的导航组件 -->
          <el-menu unique-opened router default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- el-submenu 一级导航 -->
            <el-submenu :index="menu.id + ''" v-for="menu in menusList">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ menu.authName }}</span>
              </template>
              <!-- el-menu-item就是二级导航 -->
              <el-menu-item :index="subMenu.path" v-for="subMenu in menu.children">{{ subMenu.authName }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <h1 v-if="$route.fullPath === '/main'">welcome...</h1>
        <!-- 二级路由容器 -->
        <router-view />

      </el-main>
    </el-container>

  </el-container>
</template>
<script>

export default {
  data() {
    return {
      // 左侧菜单数据
      menusList: []
    }
  },
  created() {
    console.log('路由对象：', this)
    // 请求左侧菜单的接口
    this.$http.get('menus').then(res => {
      console.log('菜单返回的数据：', res)
      this.menusList = res.data.data
    })

  },

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
