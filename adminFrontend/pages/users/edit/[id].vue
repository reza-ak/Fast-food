<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ویرایش کاربر</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger m-auto mb-4">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <div class="col-md-8">
    <FormKit
      type="form"
      @submit="update"
      :incomplete-message="false"
      :actions="false"
    >
      <div class="row gy-4">
        <div class="col-md-6">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="نام"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد نام الزامی است.' }"
            :value="user.name"
          />
        </div>

        <div class="col-md-6">
          <FormKit
            type="text"
            name="email"
            id="email"
            label="ایمیل"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            :validation="[['required'], ['email']]"
            :validation-messages="{
              required: 'فیلد ایمیل الزامی است.',
              email: 'ایمیل وارد شده معتبر نیست.',
            }"
            :value="user.email"
          />
        </div>

        <div class="col-md-6">
          <FormKit
            type="text"
            name="cellphone"
            id="cellphone"
            label="شماره تماس"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/i]]"
            :validation-messages="{
              required: 'فیلد شماره تماس الزامی است.',
              matches: 'فیلد شماره تماس معتبر نمی باشد.',
            }"
            :value="user.cellphone"
          />
        </div>

        <div class="col-md-6">
          <FormKit
            type="text"
            name="password"
            id="password"
            label="رمز عبور"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="length:8,20"
            :validation-messages="{
              length:
                'رمز طول رمز عبور وارد شده نباید کمتر از 8 یا بیشتر از 20 کاراکتر باشد.',
            }"
          />
        </div>

        <div class="col-md-12">
          <FormKit
            type="submit"
            input-class="btn btn-outline-dark mt-3"
          >
            ویرایش کاربر
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"
            ></div>
          </FormKit>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const toast = useToast();
const loading = ref(false);
const errors = ref([]);

const { data: user } = await useFetch(() => "/api/global", {
  query: { url: `/users/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

async function update(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/global", {
      method: "PUT",
      body: formData,
      query: { url: `/users/${user.value.id}` },
    });

    toast.success("ویرایش کاربر با موفقیت انجام شد.");
    return navigateTo("/users");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
