<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ایجاد محصول</h4>
  </div>

  <div class="col-md-8">
    <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
      <FormKit
        type="form"
        @submit="create"
        :incomplete-message="false"
        :actions="false"
      >
        <ProductPrimaryImage
          @setPrimaryImage="(image) => (primaryImage = image)"
        />

        <div class="row gy-4">
          <div class="col-md-12">
            <FormKit type="submit" input-class="btn btn-outline-dark mt-3">
              ایجاد محصول
              <div
                v-if="loading"
                class="spinner-border spinner-border-sm ms-2"
              ></div>
            </FormKit>
          </div>
        </div>
      </FormKit>
    </ClientOnly>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const loading = ref(false);
const primaryImage = ref(null);

async function create(formData) {
  console.log(primaryImage);
}
</script>
