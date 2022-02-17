import Vue from 'vue'
import VueRouter from 'vue-router'
import PageDashboard from '../views/PageDashboard.vue'
import AddPaymentForm from '../components/AddPaymentForm.vue'
import PaymentsDisplay from '../components/PaymentsDisplay.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PaymentsDisplay',
    component: PaymentsDisplay,
  },
  {
    path: '/add/payment/*',
    name: 'AddPaymentForm',
    component: AddPaymentForm,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PageDashboard,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/Page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.afterEach((to) => {
  if (to.name === 'AddPaymentForm') {
    let paramsString = document.location.search;
    let paramsInt = parseInt(paramsString.match(/\d+/));
    this.$store.commit('setValue', paramsInt);
  }

})
