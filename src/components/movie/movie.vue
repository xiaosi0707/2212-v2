<!-- 父组件 -->
<template>
  <div>
    <List title="热映影片">
      <template scope="{ childData }">
        <dl class="box" v-for="item in childData">
          <dt>
            <img :src="item.img" alt="">
          </dt>
          <dd>{{ item.title }}</dd>
        </dl>
      </template>
    </List>
    
  </div>
</template>
<script>
import List from './list.vue'
export default {
  components: {
    List
  }
}

</script>
