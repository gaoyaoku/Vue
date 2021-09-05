<template>
    <div id="app">
        <div class="container">
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="navigation">
                <Navigation/>
            </div>
        </div>
    </div>
</template>

<script>

// import Home from "@/pages/Home";
import Navigation from "@/components/Navigation";

export default {
    name: 'App',
    components: {
        // Home,
        Navigation
    },

}
</script>

<style lang="stylus">

@import 'assets/css/reset.css'

#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

</style>

