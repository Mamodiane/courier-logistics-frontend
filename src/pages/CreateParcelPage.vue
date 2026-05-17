<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
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

const createParcel = async () => {
  try {
    error.value = ''
    await api.post('/parcels', form.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Failed to create parcel'
  }
}
</script>

<template>
  <div>
    <h1>Create Parcel</h1>

    <form @submit.prevent="createParcel">
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

      <button type="submit">Create Parcel</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>