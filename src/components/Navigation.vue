<template>
    <div class="navigation" >
        <div class="home">
            <router-link to="/home" class="nav">主页</router-link>
        </div>
        <div class="history">
            <router-link to="/completed" class="nav">已完成</router-link>
        </div>
        <div class="me">
            <router-link to="/me" class="nav">我的</router-link>
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
    //background-color base-color
    color white
    // 在此设置不生效？？？
    //text-decoration none
    border 2px solid base-color
    //box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
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

    .nav
        text-decoration none
        color base-color

.router-link-active
    text-decoration none
    color #0A7243FF
</style>