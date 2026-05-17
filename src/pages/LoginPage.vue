<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const error = ref('')

const login = async () => {
  try {
    error.value = ''
    await authStore.login(form.value)
    router.push('/dashboard')
  } catch (err) {
    if (err.response?.data?.errors) {
  error.value = Object.values(err.response.data.errors).flat().join(' ')
} else {
  error.value = 'Invalid Login Creatantials'
}
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="Email" />
      <input v-model="form.password" type="password" placeholder="Password" />

      <button type="submit">Login</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>