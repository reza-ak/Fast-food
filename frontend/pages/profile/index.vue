<template>
  <div class="vh-70">
    <div v-if="errors.length > 0" class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <FormKit
      type="form"
      @submit="edit"
      :incomplete-message="false"
      :actions="false"
    >
      <div class="row g-4">
        <div class="col col-md-6">
          <FormKit
            type="text"
            name="name"
            id="fullName"
            label="نام و نام خانوادگی"
            label-class="form-label"
            input-class="form-control"
            validation="required"
            :validation-messages="{
              required: 'فیلد نام و نام خانوادگی الزامی است.',
            }"
            messages-class="form-text text-danger"
            :value="user.name"
          />
        </div>

        <div class="col col-md-6">
          <FormKit
            type="email"
            name="email"
            id="email"
            label="ایمیل"
            label-class="form-label"
            input-class="form-control"
            validation="required | email"
            :validation-messages="{
              required: 'فیلد ایمل الزامی است.',
              email: 'فرمت ایمیل وارد شده اشتباه است.',
            }"
            messages-class="form-text text-danger"
            :value="user.email"
          />
        </div>

        <div class="col col-md-6">
          <label class="form-label">شماره تلفن</label>
          <input
            type="text"
            disabled
            class="form-control"
            :value="user.cellphone"
          />
        </div>

        <!-- پکیج استفاده شده به صورت پیشفرض دیسیبل را انجام میدهد -->
        <FormKit type="submit" input-class="btn btn-primary mt-4">
          ویرایش
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const { data: user } = await useFetch("/api/profile/info/info", {
  headers: useRequestHeaders(["cookie"]),
});

const toast = useToast();
const errors = ref([]);
const loading = ref(false);
async function edit(formData) {
  try {
    loading.value = true;
    errors.value = []
    await $fetch("/api/profile/info/edit", {
      method: "POST",
      body: formData,
    });
    toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
