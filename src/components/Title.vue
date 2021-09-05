<template>
    <transition
        name="animate__animated animate__bounce"
        appear
        enter-active-class="animate__fadeInDown"
    >
        <div id="title">
            <h1>{{ Title }}</h1>
        </div>
    </transition>
</template>

<script>
import 'animate.css';

export default {
    name: "Title",
    props: ['Title']
}

</script>

<style lang="stylus" scoped>

#title
    font-size 30px
    text-align center
    margin 20px auto

</style>