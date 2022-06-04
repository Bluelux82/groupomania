import { createRouter, createWebHashHistory } from 'vue-router'

// Set path/name/component for all view
const routes = [
  {
    path:'/',
    name: 'MainPageView',
    component: () => import('../views/MainPageView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path:'/:id',
    name: 'ModifView',
    component: () => import('../views/ModifView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
