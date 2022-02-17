import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import context from './plugins/ContexMenu'
import modal from './plugins/ModalWindow'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(context)
Vue.use(modal)

new Vue({
  template: '<App :page="page" />',

  data() {
    return {
      page: ''
    }
  },

  methods: {
    setPage() {
      this.page = location.pathname.slice(1);
    }
  },

  mounted() {
    this.setPage();
    this.$on('router-go', this.setPage);
    window.addEventListener('popstate', this.setPage);
  },

  router,
  store,
  vuetify,
  render: h => h(App)
},
).$mount('#app')
