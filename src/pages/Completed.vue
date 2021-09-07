<template>
    <div id="completed">
        <div class="todo-container">
            <div class="todo-wrapper">
                <Title title="已完成"/>
                <ItemList :store="$store.state.todoCompletedStore" :archive="false"/>
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/Title";
import ItemList from "@/components/ItemList";

export default {
    name: "Completed",
    components: {
        Title,
        ItemList
    }
}
</script>

<style lang="stylus" scoped>

@import '../assets/css/variables.styl'
@import '../assets/css/mixins.styl'

#completed
    base-container()
    color base-color

</style>