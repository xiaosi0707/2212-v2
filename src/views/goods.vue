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
            <Page :num="goodsParams.pagenum"
                    :size="[2, 4, 8, 16]"
                    :total="goodsTotal"
                    @sendSizeChange="handleSizeChange"
                    @sendCurrentChange="handleCurrentChange"
             />
        </el-card>
        <!-- 表格 -->
        
    </div>
</template>
<script>
import Search from '../components/search.vue'
import Page from '../components/page.vue'
export default {
    components: {
        Search,
        Page
    },
    data() {
        return {
             // 请求用户列表的参数
            goodsParams: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            // 商品总数
            goodsTotal: 0
        }
    },
    created() {
        this.getGoodsData()
    },
    methods: {
        // 每页显示的条数发生变化就会执行这个方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // 每页显示多少条数据把分页组件下拉菜单中每页多少条的值取到然后赋值给我们请求用户列表中的pagesize字段这样分页组件的改变就会和用户列表数据发生了关联
            this.goodsParams.pagesize = val
            //重新请求用户列表的数据
            this.getGoodsData()
        },
        handleCurrentChange(val) {
            // 分页组件的页码发生变化后的值就是当前是第几页，然后把这个值赋值给请求用户列表中的参数pagenum
            this.goodsParams.pagenum = val
            console.log(`页码的改变触发了这个方法的执行；当前页: ${val}`);
            //重新请求用户列表的数据
            this.getGoodsData()
        },
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
        // 请求商品列表
        getGoodsData() {
            // 请求用户列表的接口
            this.$http.get('goods', {
                params: this.goodsParams
            },).then(res => {
                console.log(res) // -> 数据
               
                let { goods,total } = res.data.data
                this.goodsTotal = total
            
            })
        },
    }
}
</script>