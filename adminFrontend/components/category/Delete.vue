<template>
  <button :disabled="loading" @click="deleteCategory" class="btn btn-dark mt-5">
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    حذف
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["categoryId"]);
const toast = useToast();
const loading = ref(false);
async function deleteCategory() {
  try {
    loading.value = true;
    await $fetch("/api/global", {
      method: "DELETE",
      query: { url: `/categories/${props.categoryId}` },
    });
    toast.warning("حذف دسته بندی با موفقیت انجام شد.");
    return navigateTo("/categories");
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
</script>
