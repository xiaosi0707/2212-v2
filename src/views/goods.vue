<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 -->
        <!-- 表格 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>
                    <Search @sendSearch="search" />
                    <el-button type="primary" @click="goGoodsAdd">添加商品</el-button>
                </span>
            </div>
        </el-card>
        <!-- 表格 -->
        
    </div>
</template>
<script>
import Search from '../components/search.vue'
export default {
    components: {
        Search
    },
    data() {
        return {
             // 请求用户列表的参数
            goodsParams: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
        }
    },
    methods: {
        // 去添加商品的组件
        goGoodsAdd() {
            this.$router.push('/add')
        },
        // 搜索用户
        search(searchKey) {
            this.goodsParams.query = searchKey
            this.$http.get('goods', {
                params: this.goodsParams,

            }).then(res => {
                console.log('搜索结果：', res)
            })
        },
    }
}
</script>