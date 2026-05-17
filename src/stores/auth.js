import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async register(formData) {
      const response = await api.post('/register', formData)

      this.token = response.data.token
      this.user = response.data.user

      localStorage.setItem('token', this.token)

      return response
    },

    async login(formData) {
      const response = await api.post('/login', formData)

      this.token = response.data.token
      this.user = response.data.user

      localStorage.setItem('token', this.token)

      return response
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})