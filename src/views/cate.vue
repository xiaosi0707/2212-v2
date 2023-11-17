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
          <el-button type="primary" @click="addCateHandle">添加分类</el-button>
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
    <!-- 添加分类模态框 -->
    <el-dialog title="添加分类" :visible.sync="cateDialogFormVisible">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="addCateRequest.cat_name"></el-input>
        </el-form-item>
        <el-form-item>
          选择商品分类：{{ selectedCatArr }}
          <el-cascader popper-class="custom-cascader" v-model="selectedCatArr" :options="APICateList" :props="defaultProps" @change="handleChange" ref="cascaderRef"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 接口返回的分类数据
      APICateList: [],
      // 级联选择器配置
      // 级联选择器的配置
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true // 任意层级都可以选择
      },
      // 级联选择器选中的分类
      selectedCatArr: [],
      // 添加分类模态框
      cateDialogFormVisible: false,
      // 宽度
      formLabelWidth: '100px',
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
      }],
      // 添加分类请求参数
      addCateRequest: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      }
    }
  },
  created() {
    // 请求分类的数据
    this.$http.get('categories').then(res => {
      console.log('分类数据：', res)
      this.cateList = res.data.data
    })
  },
  methods: {
    // 打开模态框并请求所有的分类
    addCateHandle() {
      // 打开模态框
      this.cateDialogFormVisible = true
      // 请求所有的分类
      this.$http.get(`categories`).then(res => {
        this.APICateList = res.data.data
      })
    },
    // 添加分类
    addCate() {

      // 是哪一级分类
      this.addCateRequest.cat_level = this.selectedCatArr.length
      // 一级分类直接就是0
      if (this.selectedCatArr.length === 0) {
        this.addCateRequest.cat_pid = 0
      } else {
        // 如果要添加二级分类，那么selectedCatArr数组的长度应该是1，那么1-1就是0下标为0不就是selectedCatArr数组中的第一个id吗？
        this.addCateRequest.cat_pid = this.selectedCatArr[this.selectedCatArr.length - 1]
      }
      // 自动收到下拉框
      this.$refs.cascaderRef.dropDownVisible = false
      this.$http.post(`categories`, this.addCateRequest).then(res => {
        console.log('添加分类返回的数据：', res)
      })
    },
    // 级联选择器选项改变的时候触发
    handleChange(val) {
      console.log(val)
    }
  }
}

</script>
