import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index/index'
import Viewtopic from '@/pages/viewtopic/viewtopic'
import Viewtopic2 from '@/pages/viewtopic/viewtopic2'
import Dbrule from '@/pages/dbrule/dbrule'
import Createrule from '@/pages/dbrule/createrule'
import ChangetTitle from '@/pages/viewtopic/changetTitle'
import Authlogin from '@/pages/login/authlogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/viewtopic',
      name: 'viewtopic',
      component: Viewtopic
    }, {
      path: '/viewtopic2',
      name: 'viewtopic2',
      component: Viewtopic2
    }, {
      path: '/changetTitle',
      name: 'changetTitle',
      component: ChangetTitle
    }, {
      path: '/authlogin',
      name: 'authlogin',
      component: Authlogin
    }, {
      path: '/dbrule',
      name: 'dbrule',
      component: Dbrule,
      children: [
        {
          path: '/dbrule/createrule',
          name: 'createrule',
          component: Createrule
        }]
    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
