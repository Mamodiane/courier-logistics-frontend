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
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">
      Edit Parcel
    </h1>

    <p v-if="loading" class="text-blue-600 mb-4">
      Loading parcel...
    </p>

    <p v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </p>

    <form v-if="!loading" @submit.prevent="updateParcel">
      <input
        v-model="form.sender_name"
        placeholder="Sender Name"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.sender_phone"
        placeholder="Sender Phone"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.receiver_name"
        placeholder="Receiver Name"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.receiver_phone"
        placeholder="Receiver Phone"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.pickup_address"
        placeholder="Pickup Address"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.delivery_address"
        placeholder="Delivery Address"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.parcel_description"
        placeholder="Parcel Description"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="form.weight"
        type="number"
        step="0.01"
        placeholder="Weight"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        v-model="form.status"
        class="w-full border border-gray-300 rounded px-4 py-2 mb-6 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="collected">Collected</option>
        <option value="in_transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Parcel
      </button>
    </form>
  </div>
</template>