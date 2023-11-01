<template>
    <div>
        <h2>parent组件</h2>
        <hr>
        <child #default="slotProps">
            我是child标签中的内容:{{ slotProps }}
        </child>
    </div>
</template>
<script>
import Child from './child.vue'
export default {
    components: {
        Child
    }
}
</script>