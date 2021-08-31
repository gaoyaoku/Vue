<template>
  <ul>
    <Item v-for="todo in todos" :key="todo.id" :todo="todo"/>

  </ul>
</template>

<script>
import Item from "@/components/Item";

export default {
  name: "ItemList",
  components: {
    Item
  },
  props: ['todos']
}
</script>

<style scoped>
ul {
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
  margin: 25px auto 0;
}
</style>