<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 表格 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary">添加角色</el-button>
        </span>
      </div>
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row v-for="item in props.row.children">
              <!-- 一级权限 -->
              <el-col :span="4" style="border-top: 1px solid #EBEEF5; border-radius: 0; padding-top: 10px;">
                <el-tag class="wyf-tag" closable>{{ item.authName }}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="item1 in item.children">
                  <!-- 二级权限 -->
                  <el-col :span="8" style="border-top: 1px solid #EBEEF5; border-radius: 0;padding-top: 10px;">
                    <el-tag class="wyf-tag" type="success" closable>{{ item1.authName }}</el-tag>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="16" style="border-top: 1px solid #EBEEF5; border-radius: 0;padding-top: 10px;">
                    <el-tag class="wyf-tag" type="warning" closable v-for="item2 in item1.children">{{ item2.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" prop="id">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="openSetRights(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 表格 -->
    <!-- 分配权限模态框 -->
    <el-dialog title="分配权限" :visible.sync="setRightsDialogFormVisible">
      <!-- 
            :data -> 数据源你要渲染的数组
            show-checkbox -> 显示为复选框
            node-key: 树形节点的唯一标识
            :default-expanded-keys -> 默认 展开的节点
            default-checked-keys -> 默认选中的节点 -> 
            :props="defaultProps" -> props配置要显示的字段，具体显示的哪些字段需要在defaultProps这个对象中详细配置
            defaultProps的配置：
                label: 展示给用户的
                children: 下一级节点的属性名
            default-expand-all -> 展开所有的节点

         -->
      <el-tree :data="rightsList" ref="tree" show-checkbox node-key="id" default-expand-all :default-checked-keys="defaultChekedKeys" :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightsHandle">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限模态框 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 角色列表数据
      rolesList: [],
      // 分配权限模态框显示/隐藏
      setRightsDialogFormVisible: false,
      // 所有权限数据
      rightsList: [],
      defaultProps: {
        children: 'children', // 后代节点的属性名
        label: 'authName'
      },
      // 当前角色默认的权限id
      defaultChekedKeys: [],
      // 角色信息
      roleObj: {}
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 请求角色列表
    getRolesList() {
      this.$http.get(`roles`).then(res => {

        this.rolesList = res.data.data
      })
    },
    // 打开分配权限模态框
    openSetRights(roleObj) {
      console.log('当前角色信息：', roleObj)
      this.roleObj = roleObj
      // 打开模态框
      this.setRightsDialogFormVisible = true
      // 清空数组
      this.defaultChekedKeys = []
      // 请求所有权限接口
      this.$http.get('rights/tree').then(res => {
        this.rightsList = res.data.data
      })
      this.defaultRightsHandle(roleObj)
    },
    // 默认权限的方式
    defaultRightsHandle(roleObj) {
      roleObj.children.map(item => {
        if (item.children) { // 结束条件 -> 当没有children属性的时候结束递归
          this.defaultRightsHandle(item)
        } else {
          this.defaultChekedKeys.push(item.id)
        }
      })
    },
    // 分配权限（权限的编辑）
    /*
      @params roleId 角色id （你要给谁roleId分配什么权限rightsId）
      @params rids   权限id
     */
    setRightsHandle() {
      console.log('当前选中的节点的id', );
      // 把获取到的权限的数组转为字符串传递给接口
      const strId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join()
      console.log('拼接以后的数组：', strId)
      this.$http.post(`roles/${this.roleObj.id}/rights`, {
        rids: strId
      }).then(res => {
        console.log('返回的结果：', res)
      })
    }
  }
}

</script>
<style>
.wyf-tag {
  margin: 5px 12px 0 0;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.box-card {
  margin-top: 12px;
}

.el-input-group {
  width: 32%;
  margin-right: 12px;
}

.custom-tag {
  margin: 10px;
}

</style>
