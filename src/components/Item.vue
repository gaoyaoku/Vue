<template>
<!--  @click="getTodoIdForSelect"-->
  <li>
<!--todo 阻止事件冒泡-->
    <input class="checkbox" type="checkbox"  :checked="todo.done" @change.stop="getTodoIdForSelect"/>
    <span v-show="!todo.editable">{{ todo.title }}</span>
    <input
        class="text"
        type="text"
        :value="todo.title"
        v-show="todo.editable"
        @blur="handleBlur(todo, $event)"
        @keyup.enter="handleBlur(todo, $event)"
        ref="text"
    />
    <button @click="getTodoIdForDelete">删除</button>
    <button @click="editable(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from "pubsub-js";

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
      pubsub.publish('deleteTodo', this.todo.id)
    },
    // 编辑
    editable(todo) {
      // 使用todo.hasOwnProperty报错
      // 点击了编辑，再次点击无效
      if(!todo.editable) {
        this.$set(todo, 'editable', true)
        // 由于在设置可以修改之后，Vue会继续向下执行完此函数，直接使用focus()不起作用，使用nextTick下一轮执行
        this.$nextTick(function(){
          this.$refs.text.focus()
        })
      }
    },
    // 丢失焦点
    handleBlur(todo,e) {
      todo.editable = false
      if(!e.target.value.trim()) {
        return alert('输入不能为空！')
      }
      this.$bus.$emit('editTodo', todo.id, e.target.value)
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
.checkbox{
  margin: 8px;
  /*设置float才能调整位置，其他不能？*/
  float: left;

}
.text {
  margin-top: 2px;
  height: 24px;
  width: 400px;
  font-size: 16px;
  padding-left: 0;
  outline: none;
  border: none;
  border-radius: 2px;
  color: #2c3e50;

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