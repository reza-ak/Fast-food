<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ایجاد دسته بندی</h4>
  </div>

  <div v-if="errors.length > 0" class="alert alert-danger m-auto mb-4">
    <ul class="mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>

  <div class="col-md-8">
    <FormKit
      type="form"
      @submit="create"
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
          />
        </div>
        
        <div class="col-md-6">
          <FormKit
            type="text"
            name="description"
            id="description"
            label="توضیحات"
            label-class="form-label"
            input-class="form-control"
            messages-class="form-text text-danger"
            validation="required"
            :validation-messages="{ required: 'فیلد توضیحات الزامی است.' }"
          />
        </div>

        <div class="col-md-12">
          <FormKit
            type="submit"
            input-class="btn btn-outline-dark mt-3"
          >
            ایجاد دسته بندی
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

const toast = useToast();
const loading = ref(false);
const errors = ref([]);

async function create(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/global", {
      method: "POST",
      body: formData,
      query: { url: "/categories" },
    });

    toast.success("دسته بندی جدید با موفقیت اضافه شد.");
    return navigateTo("/categories");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
