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
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 class="font-bold text-xl text-gray-800">
        Courier Logistics
      </h1>

      <div class="flex gap-4 items-center">
        <router-link class="text-blue-600 hover:underline" to="/login">Login</router-link>
        <router-link class="text-blue-600 hover:underline" to="/register">Register</router-link>
        <router-link class="text-blue-600 hover:underline" to="/dashboard">Dashboard</router-link>
        <router-link class="text-blue-600 hover:underline" to="/create-parcel">Create Parcel</router-link>

        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>