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
      <div class="mb-3">
        <label for="cellphone" class="form-label">کد ورود</label>
        <input v-model="otp" type="text" class="form-control" id="cellphone" />
      </div>
      <div class="d-flex justify-content-between">
        <button
          type="submit"
          class="btn btn-primary btn-auth"
          :disabled="loading"
          @click.prevent="checkOtp()"
        >
          تایید
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </button>
        <AuthResendOtp @resend-otp-errors="(err) => errors = err" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const otp = ref(null);
const errors = ref([]);
const loading = ref(false);
const { authUser } = useAuth();

async function checkOtp() {
  if (otp.value == null) {
    toast.error("کد ورود الزامی است.");
    return;
  }
  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp.value)) {
    toast.error("فرمت کد ورود معتبر نیست.");
    return;
  }
  try {
    loading.value = true;
    const data = await $fetch("/api/auth/checkOtp", {
      method: "POST",
      body: { otp: otp.value },
    });
    toast.success("با موفقیت وارد شدید.");
    authUser.value = data;
    return (navigateTo('/profile'))
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
