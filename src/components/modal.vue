<template>
  <el-dialog :title="title" :visible.sync="sendModalShow" :before-close="changeModalHide">
    <el-form>
      <el-form-item label="用户名" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('username')">
        <el-input autocomplete="off" :disabled="isDisabledName" v-model="formAttr.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('password')">
        <el-input autocomplete="off" :disabled="isDisabledPwd" v-model="formAttr.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('email')">
        <el-input autocomplete="off" :disabled="isDisabledEmail" v-model="formAttr.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('mobile')">
        <el-input autocomplete="off" :disabled="isDisabledMobile" v-model="formAttr.mobile"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeModalHide">取 消</el-button>
      <!-- 放确定按钮的插槽 -->
      <slot></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 模态框的title
    title: {
      type: String
    },
    // 控制模态框显示隐藏的属性值
    sendModalShow: {
      type: Boolean,
      default: false
    },
    // label的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 收集表单数据
    formAttr: {
      type: Object,
      default: {}
    },
    // 是否禁用input
    isDisabledName: {
      type: Boolean,
      default: false
    },
    isDisabledPwd: {
      type: Boolean,
      default: false
    },
    isDisabledEmail: {
      type: Boolean,
      default: false
    },
    isDisabledMobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 模态框隐藏
    changeModalHide() {
      this.$emit('update:sendModalShow', false)
    }
  }
}

</script>
