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

const deleteParcel = async (id) => {
  if (!confirm('Are you sure you want to delete this parcel?')) {
    return
  }

  try {
    await api.delete(`/parcels/${id}`)

    parcels.value = parcels.value.filter(
      (parcel) => parcel.id !== id
    )
  } catch (err) {
    error.value = 'Failed to delete parcel'
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

    <p v-if="error">
      {{ error }}
    </p>

    <div v-if="parcels.length === 0 && !loading">
      <p>No parcels found.</p>
    </div>

    <div v-else>
      <div
        v-for="parcel in parcels"
        :key="parcel.id"
        style="border:1px solid #ccc; padding:15px; margin-bottom:10px;"
      >
        <h3>
          {{ parcel.tracking_number }}
        </h3>

        <p>
          <strong>Receiver:</strong>
          {{ parcel.receiver_name }}
        </p>

        <p>
          <strong>Status:</strong>
          {{ parcel.status }}
        </p>

        <p>
          <strong>Delivery Address:</strong>
          {{ parcel.delivery_address }}
        </p>

        <p>
          <strong>Created:</strong>
          {{ parcel.created_at }}
        </p>

        <router-link :to="`/edit-parcel/${parcel.id}`">
  Edit
</router-link>

        <button @click="deleteParcel(parcel.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>