import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home/home'
// import City from '@/pages/city/city'
// import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/home/home')
    }, {
      path: '/city',
      name: 'City',
      component: () => import('@/pages/city/city')
    }, {
			path: '/detail/:id',
			name: 'Detail',
			component: () => import('@/pages/detail/Detail')
		}],
		scrollBehavior (to, from, savedPosition) {
			return { x: 0, y: 0 }
		}
})
