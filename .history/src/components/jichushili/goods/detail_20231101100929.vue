<template>
  <div>
    <h2>详情页</h2>
    <!-- <p>{{ goodsInfo.id }}</p>
    <p>{{ goodsInfo.title }}</p>
    <p>{{ goodsInfo.price }}</p>
    <p>
      <img :src="goodsInfo.img" alt="">
    </p> -->
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('detail组件挂载完毕')
  },
  beforeDestroy() {
    console.log('detail组件被销毁了')
  },
  data() {
    return {
      goodsInfo: {},
      proList: [{
          id: 1,
          title: '连衣裙',
          price: 999.00,
          img: 'https://img12.360buyimg.com/n7/jfs/t1/98826/5/34282/70832/6538dcf1Fac4dc1aa/e8c242cd9ddbd6c8.jpg'
        },
        {
          id: 2,
          title: '西装',
          price: 1999.00,
          img: "https://img12.360buyimg.com/n7/jfs/t1/94996/10/45764/72945/653ea15cFf3d810f2/1ae6c75d9d8452d1.jpg"
        },
        {
          id: 3,
          title: '皮衣',
          price: 4999.00,
          img: "https://img10.360buyimg.com/n7/jfs/t1/217725/28/26687/94603/65364754F2b829b59/931b86b20a2094da.jpg"
        },
        {
          id: 4,
          title: '包包',
          price: 99999.00,
          img: "https://img13.360buyimg.com/n7/jfs/t1/237348/29/443/124541/6535ec9aF350edfe6/ee39cef2b3055281.jpg"
        },
        {
          id: 5,
          title: '手表',
          price: 9999.00,
          img: "https://img12.360buyimg.com/n7/jfs/t1/131960/36/39959/36655/65363f1cFae1f1087/cc850dd4b2621636.jpg"
        }
      ]
    }
  },
  created() {
    console.log(this.$route.params)
    // 拿到了list组件传递过来的商品id
    // if (this.$route.query.id) {
    //   const goodsId = this.$route.query.id
    //   // 根据拿到的商品id从整个商品数据中遍历找到和拿到的id对应的商品数据
    //   this.goodsInfo = this.proList.filter(item => item.id === Number(goodsId))[0]
    // }


  }
}

</script>
