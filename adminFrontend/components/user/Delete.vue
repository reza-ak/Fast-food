<template>
  <button :disabled="loading" @click="deleteUser" class="btn btn-dark mt-5">
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    حذف
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["userId"]);
const toast = useToast();
const loading = ref(false);
async function deleteUser() {
  try {
    loading.value = true;
    await $fetch("/api/global", {
      method: "DELETE",
      query: { url: `/users/${props.userId}` },
    });
    toast.warning("حذف کاربر با موفقیت انجام شد.");
    return navigateTo("/users");
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
</script>
