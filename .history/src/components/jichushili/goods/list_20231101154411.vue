<template>
  <div class="list">
    <router-link
      :to="{
        name: 'detail',
        query: { id: item.id, title: item.title, price: item.price },
      }"
      tag="dl"
      v-for="item in proList"
    >
      <dt>
        <img :src="item.img" />
      </dt>
      <dd>
        <p>{{ item.id }} - {{ item.title }} - {{ item.price }}</p>
      </dd>
    </router-link>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("list组件挂载完毕");
  },
  beforeDestroy() {
    console.log("list组件被销毁了");
  },
  data() {
    return {
      proList: [
        {
          id: 1,
          title: "连衣裙",
          price: 999.0,
          img: "https://img12.360buyimg.com/n7/jfs/t1/98826/5/34282/70832/6538dcf1Fac4dc1aa/e8c242cd9ddbd6c8.jpg",
        },
        {
          id: 2,
          title: "西装",
          price: 1999.0,
          img: "https://img12.360buyimg.com/n7/jfs/t1/94996/10/45764/72945/653ea15cFf3d810f2/1ae6c75d9d8452d1.jpg",
        },
        {
          id: 3,
          title: "皮衣",
          price: 4999.0,
          img: "https://img10.360buyimg.com/n7/jfs/t1/217725/28/26687/94603/65364754F2b829b59/931b86b20a2094da.jpg",
        },
        {
          id: 4,
          title: "包包",
          price: 99999.0,
          img: "https://img13.360buyimg.com/n7/jfs/t1/237348/29/443/124541/6535ec9aF350edfe6/ee39cef2b3055281.jpg",
        },
        {
          id: 5,
          title: "手表",
          price: 9999.0,
          img: "https://img12.360buyimg.com/n7/jfs/t1/131960/36/39959/36655/65363f1cFae1f1087/cc850dd4b2621636.jpg",
        },
      ],
    };
  },
};
</script>
<style>
.list dl {
  width: 200px;

  overflow: hidden;
  border: 1px gray soild;
  float: left;

  text-align: center;
  margin-right: 12px;
}
</style>
