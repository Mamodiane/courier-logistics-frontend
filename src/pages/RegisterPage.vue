<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const error = ref('')

const register = async () => {
  try {
    error.value = ''

    await authStore.register(form.value)

    router.push('/dashboard')
  } catch (err) {
    if (err.response?.data?.errors) {
  error.value = Object.values(err.response.data.errors).flat().join(' ')
} else {
  error.value = 'Registration failed'
}
  }
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">
      Register
    </h1>

    <form @submit.prevent="register">
      <input
        v-model="form.name"
        type="text"
        placeholder="Name"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.password_confirmation"
        type="password"
        placeholder="Confirm Password"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-6 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>

    <p v-if="error" class="text-red-500 mt-4">
      {{ error }}
    </p>
  </div>
</template>