<template>
  <button :disabled="loading" @click="deleteCoupon" class="btn btn-dark mt-5">
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    حذف
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["couponId"]);
const toast = useToast();
const loading = ref(false);
async function deleteCoupon() {
  try {
    loading.value = true;
    await $fetch("/api/global", {
      method: "DELETE",
      query: { url: `/coupons/${props.couponId}` },
    });
    toast.warning("حذف کد تخفیف با موفقیت انجام شد.");
    return navigateTo("/coupons");
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
</script>
