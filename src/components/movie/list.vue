<!-- 子组件 -->
<template>
  <div class="hot">
    <h3>{{ title }}</h3>
    <slot :childData="reying"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 热映影片
      reying: [{
        title: '河边的错误',
        img: 'https://img2.doubanio.com/view/photo/m_ratio_poster/public/p2899486451.jpg'
      }, {
        title: '最好的相遇',
        img: 'http://43.138.15.137:9000/zuihaodexiangyu.jpg'
      }, {
        title: '志愿军',
        img: 'http://43.138.15.137:9000/zhiyuanjun.jpg'
      }]
    }
  }
}

</script>
<style>
.hot {
  width: 100%;
  overflow: hidden;
}

.hot h3 {
  margin-left: 10px;
}

.box {
  width: 160px;
  height: 200px;
  float: left;
  margin: 10px;
}

.hot video {
  width: 530px;
}

.hot img {
  width: 530px;
}

.box dt img {
  width: 100%;
  height: 230px;
  border-radius: 5px;
}

</style>
