import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    state: {
        todoStore: JSON.parse(localStorage.getItem('todoStore')) || [],
        todoCompletedStore: JSON.parse(localStorage.getItem('todoCompletedStore')) || []
    },
    actions: {

    },
    mutations: {
        CHANGE_TODO_STATUS(state, id) {
            state.todoStore.forEach((todo) => {
                if(todo.id === id) {
                    todo.done = !todo.done
                    console.log(`CHANGE_TODO_STATUS: ${todo.id}-${todo.done}`)
                }
            })
        },
        DELETE_TODO(state, id) {
            state.todoStore = state.todoStore.filter((todo) => {
                return todo.id !== id
            })
            state.todoCompletedStore = state.todoCompletedStore.filter((todo) => {
                return todo.id !== id
            })
        },
        ARCHIVE_TODO(state, Todo) {
            // 注意filter不改变原数组
            state.todoStore = state.todoStore.filter((todo) => {
                return todo.id !== Todo.id
            })
            console.log(`DELETE_TODO: ${Todo.title}`)

            Todo.done = true
            state.todoCompletedStore.unshift(Todo)
        },
        EDIT_TODO(state, {id,title}) {
            state.todoStore.forEach((todo) => {
                if(todo.id === id) {
                    todo.title = title
                }
            })
        },
        ADD_TODO(state, todoObject) {
            state.todoStore.unshift(todoObject)
            // todo 存储
            localStorage.setItem('todoStore',JSON.stringify(state.todoStore))
        },
        CHANGE_ALL_TODOS_STATUS(state, flag) {
            state.todoStore.forEach((todo) => {
                todo.done = flag
            })
        },
        DELETE_ALL_TODOS(state) {
            state.todoStore = state.todoStore.filter((todo) => {
                return !todo.done
            })
        },
        ARCHIVE_ALL_TODOS(state) {
            state.todoStore.forEach((todo) => {
                if(todo.done) {
                    // this.$set(todo, 'archived', true)
                    state.todoCompletedStore.unshift(todo)
                }
            })
            state.todoStore = state.todoStore.filter((todo) => {
                return !todo.done
            })
        }
    },
    getters: {
        countTotal(state) {
            return state.todoStore.length
        },
        countDone(state) {
            return state.todoStore.reduce((count, todo) => todo.done ? count + 1 : count, 0)
        }
    }
})