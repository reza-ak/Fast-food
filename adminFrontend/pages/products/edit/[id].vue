<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ویرایش محصول</h4>
  </div>

  <div class="col-md-12 row">
    <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
      <FormKit
        type="form"
        @submit="edit"
        :incomplete-message="false"
        :actions="false"
      >
        <ProductPrimaryImage
          :primary-image="product.primary_image"
          @setPrimaryImage="(image) => (primaryImage = image)"
        />
        <div class="row">
          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="text"
              name="name"
              id="name"
              label="نام"
              label-class="form-label"
              input-class="form-control"
              :value="product.name"
              validation="required"
              :validation-messages="{
                required: 'فیلد نام الزامی است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="select"
              name="category_id"
              id="category_id"
              label="دسته بندی"
              label-class="form-label"
              input-class="form-select"
              validation="required"
              :value="product.category_id"
              :validation-messages="{
                required: 'فیلد دسته بندی الزامی است.',
              }"
              messages-class="form-text text-danger"
            >
              <option
                v-for="category in categories.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </FormKit>
          </div>

          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="select"
              name="status"
              id="status"
              label="وضعیت"
              label-class="form-label"
              input-class="form-select"
              :value="product.status_value"
              messages-class="form-text text-danger"
            >
              <option value="1" selected>فعال</option>
              <option value="0">غیرفعال</option>
            </FormKit>
          </div>

          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="text"
              name="price"
              id="price"
              label="قیمت"
              label-class="form-label"
              input-class="form-control"
              :value="product.price"
              validation="required | number"
              :validation-messages="{
                required: 'فیلد قیمت الزامی است.',
                number: 'فیلد قیمت باید عددی باشد.',
              }"
              messages-class="form-text text-danger"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="text"
              name="quantity"
              id="quantity"
              label="تعداد"
              label-class="form-label"
              input-class="form-control"
              :value="product.quantity"
              validation="required | number"
              :validation-messages="{
                required: 'فیلد تعداد الزامی است.',
                number: 'فیلد تعداد باید عددی باشد.',
              }"
              messages-class="form-text text-danger"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="text"
              name="sale_price"
              id="sale_price"
              label="قیمت حراجی"
              label-class="form-label"
              input-class="form-control"
              :value="product.sale_price"
              validation="number"
              :validation-messages="{
                number: 'فیلد قیمت حراجی باید عددی باشد.',
              }"
              messages-class="form-text text-danger"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <label class="form-label">تاریخ شروع حراجی</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="bi bi-clock"></i></span>
              <input
                type="text"
                class="form-control"
                id="sale-date-from-picker"
                :placeholder="product.date_on_sale_from_jalali"
              />
            </div>
            <!-- display-format یا نحوه نمایش به صورت جلالی -->
            <!-- format فرمت تاریخی که برمیگرداند میلادی هست چون API گفته -->
            <date-picker
              v-model="saleDateFrom"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              display-format="HH:mm jYYYY-jMM-jDD"
              custom-input="#sale-date-from-picker"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <label class="form-label">تاریخ پایان حراجی</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="bi bi-clock"></i></span>
              <input
                type="text"
                class="form-control"
                id="sale-date-to-picker"
                :placeholder="product.date_on_sale_to_jalali"
              />
            </div>
            <date-picker
              v-model="saleDateTo"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              display-format="HH:mm jYYYY-jMM-jDD"
              custom-input="#sale-date-to-picker"
            />
          </div>

          <div class="col-12">
            <FormKit
              type="textarea"
              rows="5"
              name="description"
              id="description"
              label="توضیحات"
              label-class="form-label"
              input-class="form-control"
              validation="required"
              :value="product.description"
              :validation-messages="{
                required: 'فیلد توضیحات الزامی است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>

          <div class="col-12 col-md-3 mb-3">
            <label for="images" class="form-label">تصاویر</label>
            <input
              @change="imagesFile"
              class="form-control"
              type="file"
              id="formFile"
              multiple
            />
          </div>
          <div class="col-md-12">
            <img
              v-for="image in product.images"
              class="me-3"
              :src="image.image"
              width="300"
            />
          </div>
        </div>

        <div class="row gy-4">
          <div class="col-md-12">
            <FormKit type="submit" input-class="btn btn-outline-dark mt-3">
              ویرایش محصول
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
import { useToast } from "vue-toastification";

definePageMeta({
  middleware: "auth",
});

const loading = ref(false);
const errors = ref([]);
const toast = useToast();

const primaryImage = ref(null);
const saleDateFrom = ref(null);
const saleDateTo = ref(null);
const images = ref(null);
const route = useRoute();

const { data: categories } = await useFetch(() => "/api/global", {
  query: { url: "/categories" },
  headers: useRequestHeaders(["cookie"]),
});

const { data: product } = await useFetch(() => "/api/global", {
  query: { url: `/products/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

function imagesFile(el) {
  images.value = el.target.files;
}

async function edit(data) {
  // API ورودی های را به صورت formData میخواهد چون تصویر داریم
  // در حالت کلی اگر فایل داشته باشیم باید از formData استفاده کنیم
  const formData = new FormData();
  formData.append(
    "primary_image",
    primaryImage.value ? primaryImage.value : null
  );
  formData.append("name", data.name);
  formData.append("category_id", data.category_id);
  formData.append("status", data.status);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("sale_price", data.sale_price);
  formData.append(
    "date_on_sale_from",
    saleDateFrom.value ? saleDateFrom.value : product.value.date_on_sale_from
  );
  formData.append(
    "date_on_sale_to",
    saleDateTo.value ? saleDateTo.value : product.value.date_on_sale_to
  );
  formData.append("description", data.description);
  if (images.value) {
    for (let index = 0; index < images.value.length; index++) {
      formData.append("images", images.value[index]);
    }
  } else {
    formData.append("images", null);
  }

  try {
    loading.value = true;
    errors.value = [];
    // چون فایل داریم بخاطر همین از API global استفاده نکردیم
    await $fetch("/api/products/edit", {
      method: "PUT",
      body: formData,
      query: {url: `/products/${product.value.id}`}
    });
    toast.success("ویرایش محصول با موفقیت انجام شد.");
    // return navigateTo("/products");
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
