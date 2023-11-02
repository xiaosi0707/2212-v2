<template>
    <div>
      <!-- goods -->
      <div class="goods-wrapper">
        <!-- 左侧导航菜单 -->
        <div class="goods-menu">
          <ul>
            <li>
              <span>热销榜</span>
            </li>
            <li class="active">
              <span>单人特色套餐</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
            <li>
              <span>热销榜</span>
            </li>
          </ul>
        </div>
        <!-- 右侧商品列表 -->
        <div class="goods-list">
          <div class="content-wrapper">
            <h3 class="title">盖浇饭</h3>
            <ul>
              <li 
                class="first" 
              >
                <div class="img-wrapper">
                  <img alt="" />
                </div>
                <div class="content">
                  <h3 class="name">宫保鸡丁</h3>
                  <p class="description">很好吃</p>
                  <div class="rating-wrapper">
                    <span class="sell-count">月售123份</span>
                    <span class="rating">好评率99%</span>
                  </div>
                  <div class="price">
                    <span class="new-price">￥32.00</span>
                    <span class="old-price">￥48.00</span>
                  </div>
                </div>
                <div class="btn-wrapper">
                  <span class="add">-</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="footer">
        <div class="content-wrapper">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo">
                <span class="iconfont icon-gouwuche"></span>
              </div>
            </div>
            <div class="price">
              <span class="num">￥0</span>
            </div>
            <div class="peisong">令需配送费￥4</div>
          </div>
          <div class="content-right">￥20起送</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Axios from 'axios'
  export default {
    data() {
      return {
        goodsList: []
      }
    },
    created() {
      Axios.get('/goods.json').then(res => {
        console.log(res)
        let { data } = res.data
        this.goodsList = data;
      })
    }
  }
  </script>
  
  <style scoped>
  .goods-wrapper {
    position: absolute;
    top: 3.48rem;
    bottom: 1rem;
    display: flex;
    width: 100%;
    font-size: .24rem;
    overflow: auto;
  }
  /* 左侧菜单 */
  .goods-wrapper .goods-menu {
    width: 1.6rem;
  }
  .goods-wrapper .goods-menu li {
    padding: 0 .24rem;
    height: 1.08rem;
    line-height: .28rem;
    display: table;
    background-color: #f3f5f7;
  }
  .goods-wrapper .goods-menu li.active {
    position: relative;
    top: -1px;
    background: #fff;
  }
  .goods-wrapper .goods-menu li.active span:before {
    content: "";
    width: .24rem;
    height: .24rem;
    display: inline-block;
    background: url('../../assets/imgs/special_1@2x.png') no-repeat;
    background-size: 100% 100%;
  }
  .goods-wrapper .goods-menu li span {
    display: table-cell;
    vertical-align: middle;
    width: 1.12rem;
    border-bottom: 1px solid #ccc;
  }
  .goods-wrapper .goods-menu li.active span {
    border-bottom: 0;
  }
  .goods-wrapper .goods-list {
    flex: 1;
  }
  
  
  .goods-list .title {
    padding-left: .28rem;
    height: .52rem;
    line-height: .52rem;
    border-left: 2px solid #d9dde1;
    font-size: .24rem;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }
  .goods-list ul {
    padding: 0 .36rem;
  }
  .goods-list  li {
    position: relative;
    display: flex;
    padding: .36rem 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .goods-list  li:last-child {
    border-bottom: 0;
  }
  .goods-list  li.first {
    border-bottom: 0;
  }
  .goods-list .btn-wrapper {
    position: absolute;
    right: 0;
    bottom: .25rem;
    display: flex;
    align-items: center;
  }
  .goods-list .btn-wrapper .add,
  .goods-list .btn-wrapper .decrease {
    display: inline-block;
    width: .48rem;
    height: .48rem;
    padding: .06rem;
    background: rgb(0, 160, 220);
    font-size: .48rem;
    line-height: .34rem;
    text-align: center;
    color: #fff;
    border-radius: 50%;
  }
  .goods-list .btn-wrapper .count {
    margin: 0 .2rem;
  }
  .goods-list  li .img-wrapper {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: .2rem;
  }
  .goods-list  li .img-wrapper img {
    width: 100%;
    height: 100%;
  }
  .goods-list  li .name {
    margin-top: .04rem;
    margin-bottom: .16rem;
    font-size: .28rem;
    line-height: .28rem;
    color: rgb(7, 17, 27);
  }
  .goods-list  li .description,
  .goods-list  li .rating-wrapper {
    line-height: .2rem;
    font-size: .2rem;
    color: rgb(147, 153, 159);
  }
  .goods-list  li .description {
    margin-bottom: .16rem;
  }
  .goods-list  li .rating-wrapper .sell-count {
    margin-right: .14rem;
  }
  .goods-list li .price {
    font-weight: 700;
    line-height: .48rem;
  }
  .goods-list  li .price .new-price {
    font-size: .28rem;
    color: #f00;
  }
  .goods-list  li .price .old-price {
    font-size: .2rem;
    color: rgb(147, 153, 159);
  }
  
  
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 1rem;
    line-height: .48rem;
    font-weight: 700;
    color: rgba(255, 255, 255, .4);
  }
  .footer .content-wrapper {
    display: flex;
    background: #141d27;
  }
  .footer .content-left {
    flex: 1;
  }
  .footer .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -.12rem;
    margin: 0 .24rem;
    padding: .12rem;
    width: 1.12rem;
    height: 1.12rem;
    border-radius: 50%;
    background: #141d27;
  }
  .footer .content-left .logo-wrapper .logo {
    width: .88rem;
    height: .88rem;
    line-height: .48rem;
    border-radius: 50%;
    text-align: center;
    background-color: #2b343c;
  }
  .footer .content-left .logo-wrapper .logo span {
    font-size: .48rem;
    color: rgba(255, 255, 255, .4);
  }
  .footer .content-left .price {
    display: inline-block;
    vertical-align: top;
    padding-right: .24rem;
    margin-top: .24rem;
    font-size: .32rem;
    border-right: 1px solid rgba(255, 255, 255, .1);
  }
  .footer .content-left .peisong {
    display: inline-block;
    vertical-align: top;
    padding-top: .24rem;
    font-size: .24rem;
  }
  .footer .content-right {
    width: 2.1rem;
    font-size: .24rem;
    background: #2b343b;
    text-align: center;
    line-height: 1rem;
  }
  </style>