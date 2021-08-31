<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-warp">
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
    //是否删除
    deleteTodo(id) {
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
    }
  },
  mounted() {
    // 绑定事件，接受参数，执行回调函数。
    this.$bus.$on('selectTodo', this.selectTodo)
    this.$bus.$on('deleteTodo', this.deleteTodo)
  },
  // 由于此组件被销毁时，$bus身上的时间还在，所以就帮助销毁一下。
  beforeDestroy() {
    this.$bus.off('selectTodo')
    this.$bus.off('deleteTodo')
  }
}
</script>

<style>
#root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.todo-container {
  width: 600px;
  /*height: 600px;*/
  height: fit-content;
  margin: 60px auto 0;
  border-radius: 4px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 25px;
 }
.todo-warp {
  border: 1px solid #ccc;
  /*width: 550px;*/
  /*height: 600px;*/
  height: fit-content;
  margin: 0 auto;
  border-radius: 4px;
}

</style>

