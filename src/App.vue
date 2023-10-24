<template>
  <div>
    <h1>App组件</h1>
   <School></School>
   <Student></Student>
  </div>
</template>
<script>
import School from './components/school.vue'
import Student from './components/student.vue'
export default {
  components: {
    School,
    Student
  }

}
</script>