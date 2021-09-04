<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrapper">
        <Title/>
<!--        自定义事件调用-->
        <AddItem @addTodo="addTodo"/>
        <ItemList :todos="todos"/>
        <countItem :todos="todos" @selectAllTodo="selectAllTodo" @deleteAllTodo="deleteAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
import Title from "@/components/Title";
import AddItem from "@/components/AddItem";
import ItemList from "@/components/ItemList";
import CountItem from "@/components/CountItem";

export default {
  name: 'App',
  components: {
    Title,
    AddItem,
    ItemList,
    CountItem
  },
  data() {
    return {
      // {id:'001',title:'吃饭',done:false}
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  // 浏览器本地存储, 数据在数组中，添加时通过unshift()方法，会触发watch，且开启deep，当每一个对象中的元素改变时。
  watch: {
    todos: {
      deep:true,
      handler(value){
        localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  },
  methods: {
    //给子组件传入一个函数，利用子组件的数据
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    //是否勾选
    selectTodo(id) {
      this.todos.forEach((todo) => {
        if(todo.id === id) {
          todo.done = !todo.done
        }
      })
    },
    // 是否删除
    // 利用消息订阅，传入的第一个参数是消息名，用_作为占位符。
    deleteTodo(_,id) {
      console.log("删除")
      this.todos = this.todos.filter(todo => {
        return todo.id !== id
      })
    },
    //是否全部选择或不选
    selectAllTodo(flag) {
      this.todos.forEach((todo) => {
        todo.done = flag
      })
    },
    //删除所有已经完成的todo
    deleteAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    },
    //是否勾选
    editTodo(id, value) {
      this.todos.forEach((todo) => {
        if(todo.id === id) {
          todo.title = value
        }
      })
    },
  },
  mounted() {
    // 绑定事件，接受参数，执行回调函数。
    this.$bus.$on('selectTodo', this.selectTodo)
    // 订阅消息，由于每发布一次，id更改，且依赖id
    this.pubsubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    // 编辑
    this.$bus.$on('editTodo', this.editTodo)
  },
  beforeDestroy() {
    // 由于此组件被销毁时，$bus身上的时间还在，所以就帮助销毁一下。
    this.$bus.$off('selectTodo')
    // 传入id
    pubsub.unsubscribe(this.pubsubId)
    this.$bus.$off('editTodo')
  }
}
</script>

<style lang="stylus">
@import 'assets/css/reset.css';
@import 'assets/css/variables.styl'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color base-color

  .todo-container
    width base-width
    margin 60px auto 0
    border-radius 4px
    box-shadow rgba(99, 99, 99, 0.2) 0 2px 8px 0
    padding 25px

    .todo-wrapper
      border: 1px solid #ccc
      border-radius 4px
      margin: 0 auto

// 不知道为什么不写#app不生效
//@media screen and (max-width: 600px)
//  #app .todo-container
//    width mini-width
</style>

