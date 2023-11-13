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
                    <el-input placeholder="请输入内容"  style="width: 32%; margin-right: 10px;">
                        <template slot="append">
                            <i class="el-icon-search" ></i>
                        </template>
                    </el-input>
                    <el-button type="primary" @click="goGoodsAdd">添加商品</el-button>
                </span>
            </div>
        </el-card>
        <!-- 表格 -->
        
    </div>
</template>
<script>
export default {
    methods: {
        // 去添加商品的组件
        goGoodsAdd() {
            this.$router.push('/add')
        }
    }
}
</script>