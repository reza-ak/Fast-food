<template>
  <div class="input-group mb-3">
    <input
      v-model="code"
      type="text"
      class="form-control"
      placeholder="کد تخفیف"
    />
    <button
      @click="checkCoupon"
      :disabled="loading"
      class="input-group-text"
      id="basic-addon2"
    >
      اعمال کد تخفیف
      <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(['coupon'])

const code = ref("");
const loading = ref(false);
const toast = useToast();
async function checkCoupon() {
  if (code.value === "" || code.value === null) {
    toast.error("وارد کردن کد تخفیف الزامی است.");
    return
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/cart/checkCoupon", {
      method: "POST",
      body: { code: code.value },
    });
    toast.success("کد تخفیف شما اعمال شد.");
    props.coupon.code = code.value
    props.coupon.percent = data.percentage
  } catch (error) {
    toast.error(Object.values(error.data.data.message).flat().toString());
  } finally {
    loading.value = false
  }
}
</script>
