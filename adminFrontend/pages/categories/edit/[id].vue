<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ویرایش دسته بندی</h4>
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
            :value="category.name"
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
            :value="category.description"
          />
        </div>

        <div class="col-md-12">
          <FormKit
            type="submit"
            input-class="btn btn-outline-dark mt-3"
          >
            ویرایش دسته بندی
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

const { data: category } = await useFetch(() => "/api/global", {
  query: { url: `/categories/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

async function update(formData) {
  try {
    loading.value = true;
    errors.value = [];

    await $fetch("/api/global", {
      method: "PUT",
      body: formData,
      query: { url: `/categories/${category.value.id}` },
    });

    toast.success("ویرایش دسته بندی با موفقیت انجام شد.");
    return navigateTo("/categories");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
