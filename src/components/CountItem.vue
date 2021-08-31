<template>
  <div class="todo-CountItem">
    <input type="checkbox" v-model="isSelectAll"/>
    <span>已完成 {{countDone}} / 全部 {{countTotal}}</span>
    <button @click="isDeleteAll">删除</button>
  </div>
<!--  label标签主要用于绑定一个表单元素, 当点击label标签的时候, 被绑定的表单元素就会获得输入焦点-->
</template>

<script>
export default {
  name: "CountItem",
  props: ['todos'],
  computed: {
    countTotal() {
      return this.todos.length
    },
    countDone() {
      //使用reduce方法做条件统计。丛0开始计数，对每一个todo遍历，返回的结果作为下一次循环的count，最后reduce返回最后一次计数。
      return this.todos.reduce((count, todo) => todo.done ? count + 1 : count, 0)
    },
    //控制全选按钮，由于计算属性使用v-model双向绑定数据，所以需要利用getter和setter
    isSelectAll: {
      get() {
        return this.countTotal === this.countDone && this.countTotal > 0
      },
      set(value) {
        this.$emit('selectAllTodo',value)
      }
    }
  },
  methods: {
    isDeleteAll() {
      this.$emit('deleteAllTodo')
    }
  }


}
</script>

<style scoped>
.todo-CountItem {
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width:50%;
  height: 30px;
  line-height: 30px;
  margin: 30px auto 30px;
  text-align: center;
}
.todo-CountItem input {
  /*margin-top: 10px;*/
}
.todo-CountItem span {
  margin: 0 20px 0 10px;
}
.todo-CountItem button {
  margin-top: 2px;
}
.todo-CountItem button {
  background-color: white;
  border-radius: 2px;
  height: 25px;
  color: #41b883;
  border: 1px solid #41b883;
}
.todo-CountItem button:hover {
  color: white;
  background-color: #41b883;
}
</style>