<template>
  <button @click="deleteProduct" :disabled="loading" class="btn btn-dark my-5">
      حذف
      <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(['productId']);

const loading = ref(false);
const toast = useToast();

async function deleteProduct() {
  try {
      loading.value = true;

      await $fetch('/api/global', {
          method: 'DELETE',
          query: { url: `/products/${props.productId}` },
      })

      toast.warning("حذف محصول باموفقیت انجام شد.");
      return navigateTo('/products')
  } catch (error) {
      console.log(error.data);
  } finally {
      loading.value = false;
  }
}

</script>