<template>
    <div class="CountItem">
        <input type="checkbox" v-model="changeAllTodosStatus"/>
        <span>完成 {{ countDone }} / {{ countTotal }} 全部</span>
        <button @click="deleteAllTodos()">删除</button>
    </div>
    <!--  label标签主要用于绑定一个表单元素, 当点击label标签的时候, 被绑定的表单元素就会获得输入焦点-->
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: "CountItem",
    // props: ['todos'],
    computed: {
        ...mapGetters(['countTotal','countDone']),
        // countTotal() {
        //   return this.todos.length
        // },
        // countDone() {
        //   //使用reduce方法做条件统计。丛0开始计数，对每一个todo遍历，返回的结果作为下一次循环的count，最后reduce返回最后一次计数。
        //   return this.todos.reduce((count, todo) => todo.done ? count + 1 : count, 0)
        // },
        //控制全选按钮，由于计算属性使用v-model双向绑定数据，所以需要利用getter和setter
        // todo 当全选时，删除线效果不生效，未设置触发。
        changeAllTodosStatus: {
            get() {
                return this.countTotal === this.countDone && this.countTotal > 0
            },
            set(flag) {
                // this.$emit('selectAllTodo', value)
                this.$store.commit('CHANGE_ALL_TODOS_STATUS', flag)
            }
        }
    },
    methods: {
        // deleteAllTodos() {
        //     // this.$emit('deleteAllTodo')
        //     this.$store.commit('DELETE_ALL_TODOS')
        // }
        // 若需要传递参数，可在上方调用时传递。
        ...mapMutations({deleteAllTodos:'DELETE_ALL_TODOS'})
    }

}
</script>

<style lang="stylus" scoped>

.CountItem
    font-size: 13px
    border: 1px solid #ccc
    border-radius: 4px
    width: 50%
    height: 25px
    line-height: 25px
    margin: 30px auto 30px
    text-align: center

    input
        margin-left: 5px

    span
        margin: 0 15px 0 15px

    button
        margin-right: 5px
        background-color: white
        border-radius: 2px
        height: 20px
        font-size: 10px
        //width: 30px
        color: #41b883
        border: 1px solid #41b883

    button:hover
        color: white
        background-color: #41b883

</style>