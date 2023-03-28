<template>
  <!-- login section -->
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-body">
              <div v-if="errors.length > 0" class="alert alert-danger">
                <ul class="mb-0">
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <div class="form_container">
                <form @submit.prevent="login()">
                  <div class="mb-3">
                    <label for="cellphone" class="form-label"
                      >شماره موبایل</label
                    >
                    <input
                      v-model="phoneNumber"
                      type="text"
                      class="form-control"
                      id="cellphone"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary btn-auth" :disabled="loading">
                    ورود
                    <div
                      v-if="loading"
                      class="spinner-border spinner-border-sm ms-2"
                    ></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end login section -->
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const phoneNumber = ref(null);
const errors = ref([]);
const loading = ref(false)

async function login() {
  if (phoneNumber.value == null) {
    toast.error("شماره موبایل الزامی است.");
    return;
  }
  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(phoneNumber.value)) {
    toast.error("فرمت شماره موبایل معتبر نیست.");
    return;
  }
  try {
    loading.value = true
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: { cellphone: phoneNumber.value },
    });
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false
  }
}
</script>
