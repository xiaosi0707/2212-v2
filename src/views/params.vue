<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 表格 -->
    <el-card class="box-card">
      <!-- 提示 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false">
      </el-alert>
      <!-- 提示 -->
      <!-- 级联选择器 -->
      选择商品分类：{{ catIdArr }}
      <el-cascader v-model="catIdArr" style="margin-top: 20px" :options="catList" :props="defaultProps" @change="selectedCatId"></el-cascader>
      <!-- 级联选择器 -->
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="mini" @click="paramsDialogFormVisible = true">添加参数</el-button>
          <el-table :data="manyAttrs" style="margin-top: 12px;width: 100%" border>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="">
                    <!-- 动态参数值 -->
                    <el-tag v-for="item in props.row.attr_vals.split(' ')" closable :disable-transitions="false" @close="handleClose(tag)">
                      {{ item }}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="props.row.inputVisible" v-model="props.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="$event.target.blur()" @blur="handleInputConfirm(props.row)">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
                    <!-- 动态参数值 -->
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="index" label="">
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name">
            </el-table-column>
            <el-table-column label="操作" prop="">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">静态属性</el-tab-pane>
      </el-tabs>
      <!-- 标签页 -->
    </el-card>
    </el-card>
    <!-- 表格 -->
    <!-- 添加参数的模态框 -->
    <el-dialog title="添加参数" :visible.sync="paramsDialogFormVisible">
      <el-form>
        <el-form-item label="动态参数" :label-width="formLabelWidth">
          <el-input v-model="addManyAttr.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="paramsDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMany">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加参数的模态框 -->
  </div>
</template>
<script>
export default {

  data() {
    return {
      // 参数名称
      addManyAttr: {
        attr_name: '',
        attr_sel: 'many',
        attr_vals: '甜的 咸的 酸的'
      },
      // label的宽度 - 添加用户
      formLabelWidth: '100px',
      // 添加参数模态框
      paramsDialogFormVisible: false,
      // 分类id
      catIdArr: [],
      // 标签页
      activeName: 'first',
      // 所有的分类
      catList: [],
      // 动态参数
      manyAttrs: [],
      // 级联选择器的配置
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 点击new tag显示input框
    showInput(obj) {
      // 当前对象上面的inputVisible属性变为true
      obj.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 发送添加动态参数值的请求 执行这个方法：敲回车和失焦
    handleInputConfirm(objMany) {
      console.log('动态参数对象：', objMany)
      // 请求接口
      /*
        id 分类的id ?
        attrId 属性id
        attr_name 新属性的名字 获取
        attr_sel 参数类型many
        attr_vals 动态参数的属性值
       */
      this.addManyAttrs(objMany)

    },
    // 添加动态参数接口
    addManyAttrs(objMany) {
      let { cat_id, attr_id, attr_name, attr_vals, inputValue } = objMany
      this.$http.put(`categories/${cat_id}/attributes/${attr_id}`, {
        attr_name: attr_name,
        attr_sel: 'many',
        attr_vals: attr_vals + ' ' + inputValue
      }).then(res => {
        console.log('添加动态参数值的返回值：', res)

        // 隐藏当前对象上面的inputVisible
        objMany.inputVisible = false;
        // 清空当前对象上面的inputValue值
        objMany.inputValue = '';
        // 再次请求动态参数的值就不用手动刷新了
        this.getManyAttrs()
      })
    },
    // 分类的级联选择器改变值触发
    selectedCatId(arr) {

      if (arr.length) {
        this.getManyAttrs()
      }
    },
    // 请求动态参数列表
    getManyAttrs() {
      // 发送请求动态参数
      this.$http.get(`categories/${this.catIdArr[this.catIdArr.length - 1]}/attributes`, {
        params: {
          sel: 'many'
        }
      }).then(res => {
        // console.log('动态参数返回的结果：', res)
        let { data } = res.data
        // console.log('添加之前inputVisible的值：', data)
        // 赋值给manyAttrs之前给接口返回的动态参数每个对象中手动添加一个字段叫做inputVisible
        data.map(item => {
          // 手动给每个对象添加一个inputVisible的属性默认值为false
          item.inputVisible = false
          item.inputValue = ''
        })
        console.log('添加之后inputVisible的值：', data)
        this.manyAttrs = data
      })
    },
    // 添加动态参数
    addMany() {
      this.$http.post(`categories/${this.catIdArr[this.catIdArr.length - 1]}/attributes`, this.addManyAttr).then(res => {
        console.log('添加动态参数的返回值：', res)
        this.paramsDialogFormVisible = false
      })
    }
  }
}

</script>
<style scoped>
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
