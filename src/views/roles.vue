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
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 表格 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
      ],
      // 角色列表数据
      rolesList: [],
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 请求角色列表
    getRolesList() {
      this.$http.get(`roles`).then(res => {
        console.log('角色列表数据：', res)
        this.rolesList = res.data.data
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
