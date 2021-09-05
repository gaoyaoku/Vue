<template>
    <div class="AddItem">
        <input type="text" placeholder="创建新的待办事项..." v-model="title" @keyup.enter="addTodo"/>
        <button @click="addTodo">创建</button>
    </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
    name: "AddItem",
    data() {
        return {
            title: ''
        }
    },
    methods: {
        //加工收到的新创建的todo.title 返会App.vue的addTode()一个todo object
        addTodo() {
            //防止仅输入空格
            if (!this.title.trim()) {
                alert('请输入Todo！')
                return
            }
            const todoObject = {id: nanoid(), title: this.title.trim(), done: false}
            // 自定义事件触发
            // this.$emit('addTodo',todoObject)
            this.$store.commit('ADD_TODO',todoObject)
            this.title = ''
        }
    }
}
</script>

<style lang="stylus" scoped>
.AddItem
    text-align center

    input
        /*否则默认样式导致不起作用*/
        outline: none
        border: 1px solid #ccc
        border-radius: 4px
        width: 60%
        height: 25px
        padding 0 5px
        margin-right: 10px
        color #41b883

    button
        background-color: white
        border-radius: 2px
        height: 25px
        color: #41b883
        border: 1px solid #41b883

    button:hover
        color: white
        background-color: #41b883

    input:focus
        border: 1px solid #41b883

</style>