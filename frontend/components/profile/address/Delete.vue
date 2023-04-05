<template>
  <button @click="deleteAddress" type="button" class="btn btn-dark mt-4">
    حذف
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["addressId"]);

const loading = ref(false);
const toast = useToast();
const errors = ref([]);
async function deleteAddress() {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/delete", {
      method: "POST",
      body: {address_id: props.addressId },
    });
    refreshGetAddress()
    toast.warning("آدرس مورد نظر با موفقیت حذف شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}

const refreshGetAddress = inject('refreshGetAddress') 
</script>

