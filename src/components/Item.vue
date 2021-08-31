<template>
  <li @click="getTodoIdForSelect">
<!--todo 阻止事件冒泡-->
    <input type="checkbox"  :checked="todo.done" @change.stop="getTodoIdForSelect"/>
    <span>{{ todo.title }}</span>
    <button @click="getTodoIdForDelete" >删除</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: ['todo'],
  methods: {
    // 由于状态改变后无法直接修改传入todo.done 所以利用函数把状态改变的id传回App中的数据
    // 利用全局事件总线，帮助触发$bus身上的事件，并传递参数
    getTodoIdForSelect() {
      this.$bus.$emit('selectTodo', this.todo.id)
    },
    getTodoIdForDelete() {
      this.$bus.$emit('deleteTodo', this.todo.id)
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  border-bottom: 1px solid #ddd;
  height: 30px;
  /*消除li和ul底部边框叠加*/
  margin: -1px auto -1px;
}
li input {
  margin: 8px;
  /*设置float才能调整位置，其他不能？*/
  float: left;

}
li span {
  line-height: 30px;

  /*行内元素无法设置宽度和高度*/
  overflow: hidden;
  /*规定当文本溢出时，显示省略符号来代表被修剪的文本*/
  text-overflow: ellipsis;
  /*设置文字在一行显示，不能换行*/
  white-space: nowrap;
  display: inline-block;
  width: 400px;

}
li button {
  float: right;
  margin-right: 7px;
  margin-top: 5px;
  display: none;
  background-color: white;
  color: #41b883;
  border: 1px solid #0A7243FF;
  border-radius: 2px;
 }
li:hover {
	background-color: #41b883;
}
li:hover button {
  display: inline-block;
}
li button:hover {
  color: white;
  background-color: #0A7243FF;
}
</style>