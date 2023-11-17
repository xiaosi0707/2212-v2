<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 表格 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <el-button type="primary">添加分类</el-button>
        </span>
      </div>
      <!-- 分类的树形组件 -->
      <!-- 
         data:指定数据源
         columns:指定每列配置选项，是数组形式[{},{},{}]，其中一个对象是一列
         selection-type:是否出现复选框，true：代表出现，false：隐藏
         expand-type:是否出现展开或折叠
         show-index: 显示序号
         index-text:显示序号标题文本
         border:是否加竖线边框
         show-row-hover：是否鼠标经过时高亮
        -->
      <tree-table :selection-type="false" :expand-type="false" :show-index="true" :data="cateList" :columns="treeCol">
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-circle-close red" v-if="scope.row.cat_deleted"></i>
          <i class="el-icon-circle-check green" v-else></i>
        </template>
        <template slot="order" slot-scope="scope">
             <el-tag v-if="scope.row.cat_level === 0">一级</el-tag> 
             <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
      </tree-table>
      <!-- 分类的树形组件 -->
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 分类数据源
      cateList: [],
      treeCol: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        type: 'template', // 指定当前这一列，是通过作用域插槽渲染出来的
        template: 'isok' // 指定要使用哪个模板，来渲染当前列

      }, {
        label: '排序',
        type: "template",
        template: 'order'
      }, {
        label: '操作',
        type: 'template',
        template: 'opt'
      }]
    }
  },
  created() {
    // 请求分类的数据
    this.$http.get('categories').then(res => {
      console.log('分类数据：', res)
      this.cateList = res.data.data
    })
  }
}

</script>
