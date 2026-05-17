<script setup>
import { onMounted, ref } from 'vue'
import api from '@/services/api'

const parcels = ref([])
const loading = ref(false)
const error = ref('')

const fetchParcels = async () => {
  try {
    loading.value = true
    const response = await api.get('/parcels')
    parcels.value = response.data.data
  } catch (err) {
    error.value = 'Failed to load parcels'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchParcels()
})
</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <p v-if="loading">Loading parcels...</p>
    <p v-if="error">{{ error }}</p>

    <div v-if="parcels.length === 0 && !loading">
      <p>No parcels found.</p>
    </div>

    <ul v-else>
      <li v-for="parcel in parcels" :key="parcel.id">
        {{ parcel.tracking_number }} - {{ parcel.receiver_name }} - {{ parcel.status }}
      </li>
    </ul>
  </div>
</template>