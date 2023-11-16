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
      <el-cascader v-model="selectedCatId" :options="catList" :props="defaultProps" @change="handleChange"></el-cascader>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="mini" @click="manyDialogFormVisible=true">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary">添加参数</el-button>
        </el-tab-pane>
        <el-table :data="manyAttrs" style="width: 100%" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="">
                  <el-tag v-for="item in props.row.attr_vals" closable :disable-transitions="false" @close="handleClose(tag)">
                    {{ item }}
                  </el-tag>
                  <el-input class="input-new-tag" v-if="props.row.inputVisible" v-model="props.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(props.row)" @blur="handleInputConfirm(props.row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="" type="index">
          </el-table-column>
          <el-table-column label="参数名称" prop="attr_name">
          </el-table-column>
          <el-table-column label="操作" prop="desc">
          </el-table-column>
        </el-table>
      </el-tabs>
    </el-card>
    <!-- 表格 -->
    <!-- 添加动态参数 -->
    <el-dialog title="添加参数" :visible.sync="manyDialogFormVisible">
      <el-form>
        <el-form-item label="参数名" :label-width="formLabelWidth">
          <el-input v-model="manyVal" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="manyDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addManyAttrs">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      manyDialogFormVisible: false,
      manyVal: '',
      selectedCatId: [],
      manyAttrs: [],

      activeName: 'first',
      // 所有的分类
      catList: [],
      // 级联选择器的配置
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      formLabelWidth: '120px',

    }
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
    addManyAttrs() {

      this.$http.post(`categories/${this.selectedCatId[this.selectedCatId.length - 1]}/attributes`, {
        attr_name: this.manyVal,
        attr_sel: 'many'
      }).then(res => {
        console.log(res)
        let { data, meta } = res.data
        // 失败
        if (meta.status !== 201) return this.$message.error(meta.msg)
        // 成功
        this.$message.success(meta.msg)
        // 再次请求动态参数数据
        this.handleChange()
        // 关闭模态框
        this.manyDialogFormVisible = false

      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showInput(obj) {
      obj.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(obj) {
      // 通过传参拿到请求接口需要的两个参数
      let { attr_id, many, attr_name, attr_vals, inputValue, inputVisible } = obj
      // 如果用户什么都没有输入，则直接return
      if (inputValue.trim().length <= 0) {
        inputValue = ''
        inputVisible = false
        return
      }
      // 获取到用户输入的内容，并保存到attr_vals中
      attr_vals.push(inputValue)


      // 请求添加动态参数的接口
      /*
          id：分类id -> 级联选择器已经选过了这个是现成的selectedCatArr:[]
          attr_id：属性id -> 通过scope.row作为参数传递进来在执行handleInputConfirm这个方法的时候
          attr_name：版式/内存/cpu主频
          attr_sel：属性类型many/only
          attr_vals：参数的属性值
      */
      this.$http.put(`categories/${this.selectedCatId[this.selectedCatId.length - 1]}/attributes/${attr_id}`, {
        attr_name: attr_name,
        attr_sel: 'many',
        attr_vals: attr_vals.join(' ') // 接口文档要求转为字符串
      }).then(res => {
        console.log(res)
        // 再次请求动态参数数据
        let { meta, data } = res.data
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.$message.success(meta.msg)
        // 再次请求动态参数数据
        // this.getManyAttrs()
      })

      obj.inputVisible = false;
      obj.inputValue = '';
    },
    handleChange(value) {
      console.log(value);
      /*
        id: 三级分类的分类id -> this.selectedCatId
        sel: many或only -> 是动态还是静态

       */
      this.$http.get(`categories/${this.selectedCatId[this.selectedCatId.length - 1]}/attributes`, {
        params: {
          sel: 'many' // 是动态还是静态
        }
      }).then(res => {
        console.log(res)
        let { data, meta } = res.data
        data.map(item => {
          // 如果为空，则 不进行分割，直接返回一个空数据，表示没有可选项；
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          // 控制tag显示还是隐藏的字段
          item.inputVisible = false
          // 获取new tag里面的值的字段
          item.inputValue = ''
        })
        // 赋值给manyAttrs
        this.manyAttrs = data

      })
    }
  }
}

</script>
<style scoped>
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>
