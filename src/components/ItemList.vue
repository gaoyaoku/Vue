<template>
    <ul>
        <!--动画效果-->
        <transition-group name="todo" appear>
            <Item v-for="todo in store" :key="todo.id" :todo="todo" :archive="archive"/>
        </transition-group>
    </ul>
</template>

<script>
import Item from "@/components/Item";

export default {
    name: "ItemList",
    props: ['store', 'archive'],
    components: {
        Item
    },
}
</script>

<style lang="stylus" scoped>

ul
    border 1px solid #ccc
    border-radius 4px
    width 90%
    margin 25px auto

.todo-enter-active
    animation todo 0.5s linear

.todo-leave-active
    animation todo 0.5s linear reverse

@keyframes todo {
    from {
        transform: translateX(50%);
    }
    to {
        transform: translateX(0px);
    }
}
</style>