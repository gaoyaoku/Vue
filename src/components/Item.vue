<template>
    <li>
        <!--todo 阻止事件冒泡-->
        <div class='li-left'>
            <input class="checkbox" type="checkbox" :checked="todo.done" @change="changeTodoStatus(todo)"/>
            <span class="title" v-show="!todo.editable" :class="titleStyle">{{ todo.title }}</span>
            <input
                class="title-input"
                type="text"
                :value="todo.title"
                v-show="todo.editable"
                @blur="handleBlur(todo, $event)"
                @keyup.enter="handleBlur(todo, $event)"
                ref="text"
            />
        </div>
        <div class='li-right'>
            <button @click="editable(todo)">编辑</button>
            <button @click="deleteTodo(todo)">删除</button>
        </div>
    </li>
</template>

<script>
// import pubsub from "pubsub-js";

export default {
    name: "Item",
    props: ['todo'],
    data() {
        return {
            titleStyle: {
                "title-style": this.todo.done
            }
        }
    },
    methods: {
        // 由于状态改变后无法直接修改传入todo.done 所以利用函数把状态改变的id传回App中的数据
        // 利用全局事件总线，帮助触发$bus身上的事件，并传递参数
        // getTodoIdForSelect() {
        //     this.$bus.$emit('selectTodo', this.todo.id)
        //     // 借助此函数设置选择完成后的删除线效果。直接"title-css": this.todo.done不生效！
        //     this.titleStyle['title-style'] = !this.titleStyle['title-style']
        // },
        changeTodoStatus(todo) {
            this.$store.commit('CHANGE_TODO_STATUS', todo.id)
            this.titleStyle['title-style'] = !this.titleStyle['title-style']
        },
        // getTodoIdForDelete() {
        //     pubsub.publish('deleteTodo', this.todo.id)
        // },
        deleteTodo(todo) {
            this.$store.commit('DELETE_TODO', todo.id)
        },
        // 编辑
        editable(todo) {
            // 使用todo.hasOwnProperty报错
            // 点击了编辑，再次点击无效
            if (!todo.editable) {
                this.$set(todo, 'editable', true)
                // 由于在设置可以修改之后，Vue会继续向下执行完此函数，直接使用focus()不起作用，使用nextTick下一轮执行
                this.$nextTick(function () {
                    this.$refs.text.focus()
                })
            }
        },
        // 丢失焦点
        handleBlur(todo, e) {
            todo.editable = false
            if (!e.target.value.trim()) {
                return alert('输入不能为空！')
            }
            // this.$bus.$emit('editTodo', todo.id, e.target.value)
            // 由于不能传递两个参数，所以构造成一个对象。修改后会渲染。
            this.$store.commit('EDIT_TODO', {id:todo.id, title: e.target.value})
        }
    }
}
</script>

<style lang="stylus" scoped>
// 自定义事件标题删除样式
.title-style
    text-decoration line-through
    text-decoration-color #0A7243FF

li
    list-style none
    border-bottom 1px solid #ddd
    border-radius 4px
    height 35px
    padding 0 10px
    // 子元素将不会自动伸缩
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    /*消除li和ul底部边框叠加*/
    margin: -1px auto -1px;

    &:hover
        background-color #41b883;
        color white

    .li-left
        flex-grow 1
        display flex
        margin-right 20px
        font-size 20px

        .checkbox
            margin-right 10px
            // align-items未使其居中
            //margin-top 7px

        .title
            // 只有设置了才会grow或shrink
            flex-grow 1
            flex-shrink 1
            padding 0 5px
            display inline-block

        .title-input
            // 不设置宽度无法shrink
            width 0
            flex-grow 1
            flex-shrink 1
            font-size: 20px
            padding 0 5px
            outline none
            border none
            border-radius: 4px
            color #41b883
            /*行内元素无法设置宽度和高度*/
            overflow: hidden;
            /*规定当文本溢出时，显示省略符号来代表被修剪的文本*/
            text-overflow: ellipsis;
            /*设置文字在一行显示，不能换行*/
            white-space: nowrap;

    .li-right
        button
            display: none
            font-size: 10px
            //width: 35px
            height: 23px
            margin-left 5px
            background-color: white;
            color: #41b883;
            border: 1px solid #0A7243FF;
            border-radius: 2px;

            &:hover
                color: white;
                background-color: #0A7243FF;

            ^[0]:hover button
                display: inline-block

//line-css

</style>