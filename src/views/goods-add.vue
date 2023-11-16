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
              <el-cascader :options="catList" :props="defaultProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form label-position="top" label-width="80px">
            <el-form-item :label="item.attr_name" v-for="item in manyAttrs">
              <p>当前选中的checkbox的值：{{ checkedList }}</p>
              <el-checkbox-group v-model="checkedList">
                <el-checkbox v-for="attr in item.attr_vals.split(' ')" :label="attr" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form label-position="top" label-width="80px">
            <el-form-item :label="item.attr_name" v-for="item in onlyAttrs">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- 
            action 上传路径 必传
            on-preview 点击文件列表中的文件触发的属性
            on-remove 点击文件列表中的文件删除按钮触发的属性
           -->
          <el-upload class="upload-demo" action="http://43.138.15.137:7001/api/private/v1/upload" :on-preview="handlePreview" :headers="headersObj" :on-remove="handleRemove" :file-list="fileList" :on-success="successHandle" list-type="picture">
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
      // 上传图片鉴权
      headersObj: {
        'Authorization': localStorage.getItem('token')
      },
      // 多个复选框被选中的值
      checkedList: [],
      /*
        必传请求参数：goods_name、goods_price、goods_number、goods_weight、goods_cat
        非必传请求参数：goods_introduce、pics、attrs
       */
      addGoodsRequest: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        attrs: []
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
      // 静态属性
      onlyAttrs: [],
      active: 0,
      // 标签页的位置（上下左右）
      tabPosition: 'left',
      // 上传图片
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      /* 商品基本信息表单数据 */
      /* 商品基本信息表单数据 */

      /*级联选择器当前选中分类id*/
      catId: [],

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
    // 删除文件钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览文件的钩子
    handlePreview(file) {
      console.log(file);
    },
    // 上传文件成功的钩子
    successHandle(response, file, fileList) {
      console.log('文件上传成功后的三个参数：', response, file, fileList)
    },
    // 添加商品
    addGoods() {
      /*
        this.addGoodsRequest这个对象中现在我们获取到的值有：
        goods_name
        goods_number
        goods_weight
        goods_price
        goods_cat

        attrs现在获取到了也渲染了，但是怎么取到你选中的动态参数？
       */
      // 处理动态参数
      this.addGoodsRequest.attrs = []
      // 遍历数据源（从数据源中查找当前选中的动态参数名）
      this.manyAttrs.map((item, index) => {

        // 遍历当前选中的动态参数名儿
        this.checkedList.map((item1, index1) => {

          // 在manyAttrs中的attr_vals中有没有当前选中的动态参数的名字
          if (item.attr_vals.indexOf(item1) !== -1) {
            // 去重你要再次检查在addGoodsRequest.attrs数组中是否已经存在某个对象

            if (this.addGoodsRequest.attrs.indexOf(item) === -1) {
              // 重新组合数据结构 attr_id和attr_values
              let newObj = {
                'attr_id': item.attr_id,
                'attr_value': item.attr_vals
              }
              // 把按照接口要求的格式处理完毕放到this.addGoodsRequest.attrs这个数组当中
              this.addGoodsRequest.attrs.push(newObj)
            }
          }
        })
      })
      // 处理静态属性
      this.onlyAttrs.map((item, i) => {
        // 重新组合数据结构 attr_id和attr_values
        let newObj = {
          'attr_id': item.attr_id,
          'attr_value': item.attr_vals
        }
        // 把按照接口要求的格式处理完毕放到this.addGoodsRequest.attrs这个数组当中
        this.addGoodsRequest.attrs.push(newObj)
      })

      // 请求添加商品的接口
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

      }
      // 请求静态属性
      // 请求动态参数
      if (index === '2') {
        this.$http.get(`categories/${this.addGoodsRequest.goods_cat[this.addGoodsRequest.goods_cat.length - 1]}/attributes`, {
          params: {
            sel: 'only'
          }
        }).then(res => {
          console.log('返回的静态属性：', res)
          let { data } = res.data
          this.onlyAttrs = data
        })

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
