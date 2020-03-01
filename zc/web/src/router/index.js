import Vue from 'vue'
import VueRouter from 'vue-router'
import Scan from '../components/Scan.vue'
import Buy from '../components/Buy.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Scan
  },
  {
    path: '/buy',
    component: Buy

  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
