<template>
    <div>
        <h2>child组件</h2>
        <slot :val="childVal"></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            childVal: '我是child中的数据'
        }
    }
}
</script>