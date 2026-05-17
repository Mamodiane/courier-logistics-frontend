import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
  },
  {
  path: '/create-parcel',
  component: () => import('@/pages/CreateParcelPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router