<template>
  <el-pagination 
    @size-change="sizeChange" 
    @current-change="currentChange"
    :current-page="num"
    :page-sizes="size" 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total">
  </el-pagination>
</template>
<script>
  export default {
    props: {
      // 当前第几页
      num: {
        type: Number,
        default: 1
      },
      // 下拉列表每页显示几条
      size: {
        type: Array
      },
      // 总条数
      total: {
        type: Number
      }
    },
    methods: {
      // 每页多少条发生变化的时候触发的函数
      sizeChange(val) {
        this.$emit('sendSizeChange', val)
      },
      currentChange(val) {
        this.$emit('sendCurrentChange', val)
      }
    }
  }
</script>
