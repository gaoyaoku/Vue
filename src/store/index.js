import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    state: {
        todoStore: JSON.parse(localStorage.getItem('todos')) || []
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
            state.todoStore.filter((todo) => {
                return todo.id !== id
            })
            console.log(`DELETE_TODO: ${id}`)
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