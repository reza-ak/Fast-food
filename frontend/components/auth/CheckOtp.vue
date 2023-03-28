<template>
  <div class="card-body">
    <div v-if="errors.length > 0" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="form_container">
      <form @submit.prevent="checkOtp()">
        <div class="mb-3">
          <label for="cellphone" class="form-label">کد تایید</label>
          <input
            v-model="otp"
            type="text"
            class="form-control"
            id="cellphone"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-auth"
          :disabled="loading"
        >
          تایید
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const otp = ref(null);
const errors = ref([]);
const loading = ref(false);

async function checkOtp() {
  if (otp.value == null) {
    toast.error("کد تایید الزامی است.");
    return;
  }
  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp.value)) {
    toast.error("فرمت کد تایید معتبر نیست.");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/auth/checkOtp", {
      method: "POST",
      body: { otp: otp.value },
    });
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
