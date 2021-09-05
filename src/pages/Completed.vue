<template>
    <div id="completed">
        <div class="todo-container">
            <div class="todo-wrapper">
                <Title title="已完成"/>
                已完成
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/Title";
export default {
    name: "Completed",
    components: {
        Title
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