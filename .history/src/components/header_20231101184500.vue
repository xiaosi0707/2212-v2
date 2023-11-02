<template>
    <!-- 头部 -->
    <div class="header">
      <div class="content-wrapper">
        <!-- 头像区域 -->
        <div class="avatar">
          <img src="../../assets/imgs/avatar.jpg" alt="" />
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <div class="title">粥品香坊（大运村）</div>
          <div class="description">蜂鸟专送/38分钟送达</div>
          <div class="support">在线支付满28减5,满50减10</div>
        </div>
        <div class="support-count">5个</div>
      </div>
      <div class="notice-wrapper">
        <div class="notice">
          <img src="../../assets/imgs/bulletin@2x.png" alt="" />
        </div>
        <p>
          粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
        </p>
        <span>></span>
      </div>
      <!-- 背景 -->
      <div class="background-img">
        <img src="imgs/avatar.jpg" alt="" />
      </div>
    </div>
  </template>
  
  <style scoped>
  /* 头部样式 */
  .header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    font-size: 0.2rem;
    color: rgb(255, 255, 255);
    line-height: 0.24rem;
    font-weight: 200;
    overflow: hidden;
  }
  .header .content-wrapper {
    position: relative;
    display: flex;
    padding: 0.48rem 0 0.36rem 0.48rem;
  }
  .header .content-wrapper .avatar {
    width: 1.28rem;
    height: 1.28rem;
    margin-right: 0.32rem;
  }
  .header .content-wrapper .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 0.04rem;
  }
  .header .content-wrapper .content .title {
    margin-bottom: 0.16rem;
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.36rem;
    vertical-align: top;
  }
  .header .content-wrapper .content .title:before {
    content: "";
    vertical-align: top;
    display: inline-block;
    width: 0.6rem;
    height: 0.36rem;
    margin: 0.04rem 0.12rem 0 0;
    background: url("../../assets/imgs/brand@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .header .content-wrapper .content .description {
    margin-bottom: 0.2rem;
    font-size: 0.24rem;
  }
  .header .content-wrapper .content .support:before {
    content: "";
    vertical-align: top;
    display: inline-block;
    width: 0.24rem;
    height: 0.24rem;
    margin: 0 0.08rem 0.04rem 0;
    background: url("../../assets/imgs/decrease_1@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .header .content-wrapper .support-count {
    position: absolute;
    bottom: 0.36rem;
    right: 0.24rem;
    height: 0.48rem;
    line-height: 0.48rem;
    padding: 0 0.16rem;
    border-radius: 0.48rem;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .notice-wrapper {
    display: flex;
    height: 0.56rem;
    align-items: center;
    padding: 0 0.24rem;
    background: rgba(7, 17, 27, 0.2);
  }
  .notice-wrapper .notice {
    width: 0.44rem;
    height: 0.24rem;
  }
  .notice-wrapper .notice img {
    width: 100%;
    height: 100%;
  }
  .notice-wrapper p {
    flex: 1;
    margin: 0 0.08rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 背景 */
  .background-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -50;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .background-img img {
    width: 100%;
    height: 100%;
  }
  </style>