<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <nav>
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Register</router-link>
      |
      <router-link to="/dashboard">Dashboard</router-link>
      |
      <router-link to="/create-parcel">Create Parcel</router-link>
      |
      <button @click="logout">Logout</button>
    </nav>

    <hr />

    <router-view />
  </div>
</template>