import Vue from 'vue'
import App from './App'
import VueRes from 'vue-resource'
import VueRouter from 'vue-router'
import './assets/ionic/css/ionic.css'
import './assets/css/base.css'
import Start from '@/components/Start'
import Main from '@/components/Main'
import Detail from '@/components/Detail'
import Order from '@/components/Order'
import MyOrder from '@/components/MyOrder'
import Cart from '@/components/Cart'
import Setting from '@/components/Setting'
import Login from '@/components/Login'
Vue.use(VueRouter)
Vue.use(VueRes)
Vue.http.options.emulateJSON=true
/* eslint-disable no-new */
const routes= [
    {
      path: '/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/detail/:did',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/order/:userid',
      name: 'Order',
      component: Order
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
    path: '/login/:num',
    name: 'login',
    component:Login
  }
  ]

let router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router

let vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
vue.$mount('#app'); // 把vue挂载到dom上
router.push('/start');// 代替原本的router.go()，让页面初始默认跳转到/start

