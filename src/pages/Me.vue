<template>
    <div id="me">
        <div class="todo-container">
            <div class="todo-wrapper">
                <Title title="我的"/>
                我的
            </div>
        </div>
    </div>
</template>

<script>
import Title from "@/components/Title";

export default {
    name: "Me",
    components: {
        Title
    }
}
</script>

<style lang="stylus" scoped>

@import '../assets/css/variables.styl'
@import '../assets/css/mixins.styl'

#me
    base-container()
    color base-color

</style>