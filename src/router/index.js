import Vue from 'vue'
import VueRouter from 'vue-router'
//import AcademyForm from '../views/AcademyForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'device-quick-info',
    component: () => import('../views/Monitor/Device.vue')
  },
  {
    path: '/device-online-time',
    name: 'device-online-time',
    component: () => import('../views/Monitor/DeviceOnlineTime.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
