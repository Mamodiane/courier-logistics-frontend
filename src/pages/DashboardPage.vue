<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'

const parcels = ref([])
const loading = ref(false)
const error = ref('')
const search = ref('')

const currentPage = ref(1)
const lastPage = ref(1)

const filteredParcels = computed(() => {
  return parcels.value.filter((parcel) => {
    const keyword = search.value.toLowerCase()

    return (
      parcel.tracking_number.toLowerCase().includes(keyword) ||
      parcel.receiver_name.toLowerCase().includes(keyword) ||
      parcel.status.toLowerCase().includes(keyword)
    )
  })
})

const totalParcels = computed(() => parcels.value.length)

const pendingParcels = computed(() =>
  parcels.value.filter((parcel) => parcel.status === 'pending').length
)

const deliveredParcels = computed(() =>
  parcels.value.filter((parcel) => parcel.status === 'delivered').length
)

const cancelledParcels = computed(() =>
  parcels.value.filter((parcel) => parcel.status === 'cancelled').length
)

const fetchParcels = async (page = 1) => {
  try {
    loading.value = true
    error.value = ''

    const response = await api.get(`/parcels?page=${page}`)

    parcels.value = response.data.data
    currentPage.value = response.data.meta.current_page
    lastPage.value = response.data.meta.last_page
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

    parcels.value = parcels.value.filter((parcel) => parcel.id !== id)
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
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <router-link
        to="/create-parcel"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Parcel
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Total Parcels</p>
        <h2 class="text-2xl font-bold text-gray-800">{{ totalParcels }}</h2>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Pending</p>
        <h2 class="text-2xl font-bold text-yellow-600">{{ pendingParcels }}</h2>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Delivered</p>
        <h2 class="text-2xl font-bold text-green-600">{{ deliveredParcels }}</h2>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Cancelled</p>
        <h2 class="text-2xl font-bold text-red-600">{{ cancelledParcels }}</h2>
      </div>
    </div>

    <input
      v-model="search"
      placeholder="Search by tracking number, receiver, or status"
      class="w-full border border-gray-300 rounded px-4 py-2 mb-6 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <p v-if="loading" class="text-blue-600">
      Loading parcels...
    </p>

    <p v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </p>

    <div
      v-if="filteredParcels.length === 0 && !loading"
      class="bg-white p-6 rounded-lg shadow"
    >
      <p class="text-gray-600">
        No parcels found.
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div
        v-for="parcel in filteredParcels"
        :key="parcel.id"
        class="bg-white p-6 rounded-lg shadow border border-gray-200"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-800">
            {{ parcel.tracking_number }}
          </h3>

          <span
            :class="[
              'px-3 py-1 text-sm rounded-full font-medium',
              parcel.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : parcel.status === 'collected'
                  ? 'bg-blue-100 text-blue-800'
                  : parcel.status === 'in_transit'
                    ? 'bg-purple-100 text-purple-800'
                    : parcel.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
            ]"
          >
            {{ parcel.status }}
          </span>
        </div>

        <div class="space-y-2 text-gray-700">
          <p><strong>Receiver:</strong> {{ parcel.receiver_name }}</p>
          <p><strong>Delivery Address:</strong> {{ parcel.delivery_address }}</p>
          <p><strong>Created:</strong> {{ parcel.created_at }}</p>
        </div>

        <div class="flex gap-3 mt-6">
          <router-link
            :to="`/edit-parcel/${parcel.id}`"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </router-link>

          <button
            @click="deleteParcel(parcel.id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="lastPage > 1"
      class="flex justify-center gap-4 mt-8"
    >
      <button
        :disabled="currentPage === 1"
        @click="fetchParcels(currentPage - 1)"
        class="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Previous
      </button>

      <span class="px-4 py-2 text-gray-700">
        Page {{ currentPage }} of {{ lastPage }}
      </span>

      <button
        :disabled="currentPage === lastPage"
        @click="fetchParcels(currentPage + 1)"
        class="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>