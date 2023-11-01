<template>
  <div>
    about
  </div>
</template>
<script>
export default { 
	mounted() {
		console.log('about组件挂载完毕')
	},
	beforeDestroy() {
		console.log('about组件被销毁了')
	}
 }

</script>
