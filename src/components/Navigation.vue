<template>
    <div class="navigation" >
        <div class="home">
            <router-link to="/home">主页</router-link>
        </div>
        <div class="history">
            <router-link to="/completed">已完成</router-link>
        </div>
        <div class="me">
            <router-link to="/me">我的</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navigation",
}
</script>

<style lang="stylus" scoped>

@import '../assets/css/variables'

.navigation
    width 300px
    height 40px
    background-color base-color
    color white
    text-decoration none
    //border 1px solid black
    border-radius @height
    position fixed
    bottom 10px
    // 使水平居中
    margin 0 auto
    left 0
    right 0

    display flex
    justify-content space-evenly
    align-items center


</style>