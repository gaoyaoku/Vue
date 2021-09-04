<template>
  <transition
      name="animate__animated animate__bounce"
      appear
      enter-active-class="animate__fadeInDown"
  >
    <div id="todo-Title">
      <h1>待办</h1>
    </div>
  </transition>
</template>

<script>
import 'animate.css';

export default {
  name: "Title",

}
</script>

<style lang="stylus" scoped>

#todo-Title
  text-align center
  margin 10px auto

</style>