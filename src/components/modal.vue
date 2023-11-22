<template>
  <el-dialog :title="title" :visible.sync="sendModalShow" :before-close="changeModalHide">
    <el-form :model="formAttr">
      <el-form-item label="用户名" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('username')">
        <el-input :disabled="disabledName" v-model="formAttr.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('password')">
        <el-input :disabled="disabledPwd" v-model="formAttr.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="labelWidth" v-if="formAttr.hasOwnProperty('email')">
        <el-input :disabled="disabledEmail" v-model="formAttr.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="labelWidth"  v-if="formAttr.hasOwnProperty('mobile')">
        <el-input :disabled="disabledMobile" v-model="formAttr.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeModalHide">取 消</el-button>
      <slot name="confirm"></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
  	// 是否开启禁用
    disabledName: { 
      type: Boolean,
      default: false
    },
    // 是否开启禁用
    disabledPwd: { 
      type: Boolean,
      default: false
    },
    // 是否开启禁用
    disabledEmail: { 
      type: Boolean,
      default: false
    },
    // 是否开启禁用
    disabledMobile: { 
      type: Boolean,
      default: false
    },
    sendModalShow: {
      type: Boolean
    },
    formAttr: {
      type: Object
    },
    labelWidth: {
      type: String
    },
    title: {
      type: String
    }
  },
  methods: {
    changeModalHide() {
      this.$emit('update:sendModalShow', false)
    }
  }
}

</script>
