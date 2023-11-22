<template>
    <el-input placeholder="请输入内容"  v-model="searchVal"  style="width: 32%; margin-right: 10px;">
      <template slot="append">
        <i class="el-icon-search" @click="search"></i>
      </template>
    </el-input>
</template>
<script>
export default {
	data() {
		return {
			// 获取搜索框的数据
			searchVal: ''
		}
	},
	methods: {
		 search() {
		 	// 通知父组件发送搜索的请求，并且把搜索的关键字传递给父组件（因为父组件发请求的时候需要关键字）
		 	this.$emit('sendSearch', this.searchVal)
		 }
	}
}
</script>

