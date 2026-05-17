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
  <div>
    <h1>Register</h1>

    <form @submit.prevent="register">
      <input v-model="form.name" type="text" placeholder="Name" />

      <input v-model="form.email" type="email" placeholder="Email" />

      <input v-model="form.password" type="password" placeholder="Password" />

      <input
        v-model="form.password_confirmation"
        type="password"
        placeholder="Confirm Password"
      />

      <button type="submit">Register</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>