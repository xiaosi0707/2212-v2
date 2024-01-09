export const mixins = {
  data() {
    return {
      title: "最编程",
    };
  },
  created() {
    console.log("我是mixin中的created");
  },
  methods: {
    clickHandle() {
      console.log("我是mixin中的点击事件");
    },
  },
};