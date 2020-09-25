import Vue from 'vue'
import App from './App.vue'
import imgUploader from './components/imgUploader/index'
Vue.config.productionTip = false
Vue.use(imgUploader)

new Vue({
  render: h => h(App),
}).$mount('#app')
