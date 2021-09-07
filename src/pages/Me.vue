<template>
    <div id="me">
        <div class="todo-container">
            <div class="todo-wrapper">
                <Title title="我的"/>
                <div class="img">
                    <img src="../assets/logo.png"/>
                </div>
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

    .img
        margin 0 auto

</style>