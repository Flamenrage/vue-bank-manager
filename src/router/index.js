import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      layout:'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta:{
      layout:'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta:{
      layout:'auth',
      auth: false
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/Request.vue'),
    meta:{
      layout:'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to,from,next) => {
  const requireAuth = to.meta.auth
  if(requireAuth && store.getters['auth/isAuthorized']){
    next() //если требуется авторизация и пользователь авторизован => разрешаем переход на след страницы
  }
  else if (requireAuth && !store.getters['auth/isAuthorized']) {
    //next('/auth?message=auth') //если требуется авторизация и пользователь не авторизован => переход на стр авторизации и показ сообщения
    next()
  }
  else if(store.getters['auth/isAuthorized'] && !requireAuth) {
    next({ path: '/' })
  }
  else {
    next()
  }

})

export default router
