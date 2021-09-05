import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 把创建的Vue实例对象，即当前的vm，当作Vue原型的$bus
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  store
}).$mount('#app')