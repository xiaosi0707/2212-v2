<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <!-- 表格 -->
    <el-card class="box-card">
      <div id="main"></div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 请求数据
    this.$http.get(`reports/type/1`).then(res => {
      console.log(res)
      let { data } = res.data
      // 配置title
      data.title = {
        text: "数据统计",
        textStyle: {
          fontSize: 20,
          color: 'orange'
        },
      }
      // 配置图例
      data.legend = {
      	itemGap: 50
      }
      // 提示框组件
      data.tooltip = {
      	show: true
      }
      // // 配置x轴
      // data.xAxis = {
      // 	  position: 'top',
      // 	  offset: 0
      // }
      data.yAxis = {
      	position: "right"
      }
      // 绘制图表
      myChart.setOption(data);

    })
  }
}

</script>
<style>
#main {
  width: 100%;
  height: 420px;
}

</style>
