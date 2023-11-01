<template>
  <div>
    <h3>用户管理区域</h3>
    <table>
      <thead>
        <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.uname }}</td>
          <td>{{ item.age }}</td>
          <td>
            <router-link to="/userinfo">详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, uname: "张三", age: 10 },
        { id: 2, uname: "李四", age: 20 },
        { id: 3, uname: "王五", age: 30 },
        { id: 4, uname: "赵六", age: 40 },
      ],
    };
  },
  methods: {
    go() {
        
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #eee;
  line-height: 35px;
  font-size: 12px;
}
th {
  background-color: #ddd;
}
</style>
