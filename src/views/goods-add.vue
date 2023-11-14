<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 表格 -->
    <el-card class="box-card">
      <!-- 提示 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
      </el-alert>
      <!-- 提示 -->
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" class="wyf-steps" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 步骤条 -->
      <!-- 标签页 -->
      <el-tabs :tab-position="tabPosition" @tab-click="selectedTab">
        <el-tab-pane label="基本信息">
          <el-form label-position="top" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="addGoodsRequest.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="addGoodsRequest.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="addGoodsRequest.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="addGoodsRequest.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
             
              <!-- 
                :options 渲染的数据源 array
               -->
              <el-cascader 
               
                :options="catList" 
                :props="defaultProps" 
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form label-position="top" label-width="80px">
            <el-form-item :label="item.attr_name" v-for="item in manyAttrs">
              <el-checkbox v-model="checked1" :label="item.attr_vals" border></el-checkbox>
            </el-form-item>
            
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-position="top" label-width="80px">
            <el-form-item label="商品名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor></quill-editor>
          <el-button type="primary" style="margin-top: 24px;" @click="addGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- 标签页 -->
    </el-card>
    </el-card>
    <!-- 表格 -->
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: { quillEditor },
  data() {
    return {
      // 收集添加商品的请求参数
      addGoodsRequest: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: ''
      },
      // 所有的分类
      catList: [],
      // 级联选择器的配置
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      // 动态参数
      manyAttrs: [],
      active: 0,
      // 标签页的位置（上下左右）
      tabPosition: 'left',
      // 上传图片
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      /* 商品基本信息表单数据 */
      /* 商品基本信息表单数据 */

      /*级联选择器当前选中分类id*/
      catId: [],
      checked1: true,
      checked2: false,
    };
  },
  created() {
    // 请求所有分类的数据
    this.$http.get('categories').then(res => {
      console.log('所有分类的数据：', res)
      let { data } = res.data
      this.catList = data

    })
  },
  methods: {
    // 级联选择器选中的值改变后触发该方法
    handleChange(value) {
      console.log('当前选中的分类：', value);
      this.addGoodsRequest.goods_cat = value.join()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 添加商品
    addGoods() {
      this.$http.post('goods', this.addGoodsRequest).then(res => {
        console.log('添加商品成功：', res)
      })
    },
    // 被选中的标签方法
    selectedTab(args) {
      let { index } = args
      // 请求动态参数
      if (index === '1') {
        this.$http.get(`categories/${this.addGoodsRequest.goods_cat[this.addGoodsRequest.goods_cat.length - 1]}/attributes`, {
          params: {
            sel: 'many'
          }
        }).then(res => {
          console.log('返回的动态参数：', res)
          let { data } = res.data
          this.manyAttrs = data
        })
        // statement
      }

    }
  }
}

</script>
<style scoped>
.wyf-steps {
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
