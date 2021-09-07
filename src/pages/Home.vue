<template>
    <div id="home">
        <div class="todo-container">
            <div class="todo-wrapper">
                <Title title="待办"/>
                <AddItem/>
                <ItemList :store="$store.state.todoStore" :archive="true"/>
                <countItem/>
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
    name: 'Home',
    components: {
        Title,
        AddItem,
        ItemList,
        CountItem
    },
}
</script>

<style lang="stylus" scoped>

@import '../assets/css/variables.styl'
@import '../assets/css/mixins.styl'

#home
    base-container()
    color base-color


// 不知道为什么不写#app不生效
//@media screen and (max-width: 600px)
//  #app .todo-container
//    width mini-width
</style>

