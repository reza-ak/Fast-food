<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">ایجاد محصول</h4>
  </div>

  <div class="col-md-12 row">
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
        <div class="row">
          <div class="col-12 col-md-3 mb-3">
            <FormKit
              type="text"
              name="name"
              id="name"
              label="نام"
              label-class="form-label"
              input-class="form-control"
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
              :validation-messages="{
                required: 'فیلد توضیحات باید عددی باشد.',
              }"
              messages-class="form-text text-danger"
            />
          </div>
        </div>

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
const saleDateFrom = ref(null);
const saleDateTo = ref(null);
const images = ref(null);

const { data: categories } = await useFetch(() => "/api/global", {
  query: { url: "/categories" },
  headers: useRequestHeaders(["cookie"]),
});

function imagesFile(el) {
  images.value = el.target.files;
}

async function create(formData) {
  console.log(formData);
  console.log(primaryImage);
  console.log(saleDateFrom);
  console.log(saleDateTo);
  console.log(images);
}
</script>
