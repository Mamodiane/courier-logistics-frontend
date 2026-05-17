<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const error = ref('')

const form = ref({
  sender_name: '',
  sender_phone: '',
  receiver_name: '',
  receiver_phone: '',
  pickup_address: '',
  delivery_address: '',
  parcel_description: '',
  weight: '',
  status: 'pending',
})

const fetchParcel = async () => {
  try {
    loading.value = true
    const response = await api.get(`/parcels/${route.params.id}`)
    const parcel = response.data.data

    form.value = {
      sender_name: parcel.sender_name,
      sender_phone: parcel.sender_phone,
      receiver_name: parcel.receiver_name,
      receiver_phone: parcel.receiver_phone,
      pickup_address: parcel.pickup_address,
      delivery_address: parcel.delivery_address,
      parcel_description: parcel.parcel_description,
      weight: parcel.weight,
      status: parcel.status,
    }
  } catch (err) {
    error.value = 'Failed to load parcel'
  } finally {
    loading.value = false
  }
}

const updateParcel = async () => {
  try {
    error.value = ''
    await api.put(`/parcels/${route.params.id}`, form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Failed to update parcel'
  }
}

onMounted(() => {
  fetchParcel()
})
</script>

<template>
  <div>
    <h1>Edit Parcel</h1>

    <p v-if="loading">Loading parcel...</p>
    <p v-if="error">{{ error }}</p>

    <form v-if="!loading" @submit.prevent="updateParcel">
      <input v-model="form.sender_name" placeholder="Sender Name" />
      <input v-model="form.sender_phone" placeholder="Sender Phone" />
      <input v-model="form.receiver_name" placeholder="Receiver Name" />
      <input v-model="form.receiver_phone" placeholder="Receiver Phone" />
      <input v-model="form.pickup_address" placeholder="Pickup Address" />
      <input v-model="form.delivery_address" placeholder="Delivery Address" />
      <input v-model="form.parcel_description" placeholder="Parcel Description" />
      <input v-model="form.weight" type="number" step="0.01" placeholder="Weight" />

      <select v-model="form.status">
        <option value="pending">Pending</option>
        <option value="collected">Collected</option>
        <option value="in_transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button type="submit">Update Parcel</button>
    </form>
  </div>
</template>