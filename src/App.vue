<template>

  <div id="app">
    <!-- 一级路由 -->
   
      <router-view />
   
  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'App',
        computed: {
           ...mapState('Todo', ['list', 'inputValue']),
           ...mapGetters('Todo', ['unDoneLength', 'doneLength'])
        },
        created() {
            this.actGetList()
        },
        methods: {
            increment() {
                this.$store.commit('Count/mutCountAdd')
            },
            ...mapMutations('Todo', ['mutChangeInput', 'mutAdd', 'mutDel', 'mutStatus']),
            ...mapActions('Todo', ['actGetList']),
            getVal(e) {
                this.mutChangeInput(e.target.value)
            },
            // 添加任务
            add() {
                this.mutAdd()
            },
            // 删除任务
            del(itemId) {
                this.mutDel(itemId)
            },
            // 状态切换
            changeStatus(itemId) {
                this.mutStatus(itemId)
            }
        }
    }
</script>
<style>
    *{
        margin:0;padding: 0;
    }
    html,body{
        width: 100%;
        height:100%;
    }
    .todoForm{
        width: 460px;
        margin: 20px auto;
    }
    .addInput{
        width: 370px;
        line-height: 32px;
        border:1px solid #bbb;
        border-radius: 4px;
        padding:0 4px;
    }
    .addBtn{
        width: 80px;
        border:none;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
        background-color: #22bbf6;
        font-size: 14px;
        color: white;
        cursor:pointer;
    }
    .addBtn:hover{
        background-color: #0799d2;
    }
    .dataList{
        margin-top:5px;
        border:1px solid #bbb
    }
    .dataList li{
        list-style: none;
        padding:0 5px;
        line-height: 35px;
        margin:3px 0;
        background-color: #f4f4f4;
    }
    .dataList li>input[type=checkbox]{
        margin-right:5px;
    }
    .dataList li>a{
        float: right;
        text-decoration: none;
        color: #22bbf6;
        font-size: 14px;
    }
    .txt{
        text-align: right;
        font-size: 14px;
    }
</style>
