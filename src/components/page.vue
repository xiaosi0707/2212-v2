<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="num" :page-size="size" :page-sizes="arrSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    num: {
      type: Number
    },
    size: {
      type: Number
    },
    total: {
      type: Number
    },
    arrSizes: {
      type: Array
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sendSizeChange', val)
    },
    // 当前页数发生变化时触发
    handleCurrentChange(val) {
      // 子传父
      this.$emit('sendCurrentChange', val)
    },
  }
}

</script>
