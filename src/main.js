import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import router from './router'
Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  // 把创建的Vue实例对象，即当前的vm，当作Vue原型的$bus
  // beforeCreate() {
  //   Vue.prototype.$bus = this
  // },
  store,
  router
}).$mount('#app')