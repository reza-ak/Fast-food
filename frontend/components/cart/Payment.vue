<template>
  <button @click="payment" :disabled="loading" class="user_option btn-auth mt-4">
    پرداخت
    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
  </button>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["coupon", "addressId", "cart"]);

const loading = ref(false);
const toast = useToast();
async function payment() {
  if (props.addressId === "" || props.addressId === null) {
    toast.error("انتخاب آدرس الزامی است.");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/payment/send", {
      method: "POST",
      body: {
        cart: props.cart,
        coupon: props.coupon.code,
        address_id: props.addressId,
      },
    });
    await navigateTo(data.url, {
      external: true // چون لینک خارجی است 
    })
    
  } catch (error) {
    console.log(error);
    toast.error(Object.values(error.data.data.message).flat().toString());
  } finally {
    loading.value = false;
  }
}
</script>
