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
    meta: { requiresAuth: true },
  },
  {
    path: '/create-parcel',
    component: () => import('@/pages/CreateParcelPage.vue'),
    meta: { requiresAuth: true },
  },
  {
  path: '/edit-parcel/:id',
  component: () => import('@/pages/EditParcelPage.vue'),
  meta: { requiresAuth: true },
},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  // Block unauthenticated users
  if (to.meta.requiresAuth && !token) {
    return '/login'
  }

  // Block authenticated users from login/register
  if ((to.path === '/login' || to.path === '/register') && token) {
    return '/dashboard'
  }
})


export default router