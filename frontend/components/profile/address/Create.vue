<template>
  <span class="d-flex justify-content-center">
    <button
      class="btn btn-primary mt-4 mt-lg-0"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      ایجاد آدرس جدید
    </button>
  </span>

  <div class="collapse mt-3" id="collapseExample">
    <FormKit
      type="form"
      @submit="create"
      :incomplete-message="false"
      :actions="false"
      #default="{ value }"
      id="createAddress"
    >
      <div class="card card-body my-4">
        <div v-if="errors.length > 0" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="row g-4">
          <div class="col-12 col-md-6">
            <FormKit
              type="text"
              name="title"
              id="title"
              label="عنوان"
              label-class="form-label"
              input-class="form-control"
              validation="required"
              :validation-messages="{
                required: 'فیلد عنوان الزامی است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>
          <div class="col-12 col-md-6">
            <FormKit
              type="text"
              name="cellphone"
              id="cellphone"
              label="شماره تماس"
              label-class="form-label"
              input-class="form-control"
              :validation="[['required'], ['matches', /^(\+98|0)?9\d{9}$/]]"
              :validation-messages="{
                required: 'فیلد شماره تماس الزامی است.',
                matches: 'فرمت شماره تماس وارد شده اشتباه است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>
          <div class="col-12 col-md-6">
            <FormKit
              type="text"
              name="postal_code"
              id="postal_code"
              label="کد پستی"
              label-class="form-label"
              input-class="form-control"
              :validation="[['required'], ['matches', /^\d{5}[ -]?\d{5}$/i]]"
              :validation-messages="{
                required: 'فیلد کد پستی الزامی است.',
                matches: 'فرمت کد پستی وارد شده اشتباه است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>
          <div class="col-12 col-md-6">
            <FormKit
              type="select"
              name="province_id"
              id="province_id"
              label="استان"
              label-class="form-label"
              input-class="form-select"
              validation="required"
              :validation-messages="{
                required: 'فیلد استان الزامی است.',
              }"
              messages-class="form-text text-danger"
              @change="changeProvince"
            >
              <option
                v-for="province in props.provinces"
                :key="province.id"
                :value="province.id"
              >
                {{ province.name }}
              </option>
            </FormKit>
          </div>
          <div class="col-12 col-md-6">
            <FormKit
              type="select"
              name="city_id"
              id="city_id"
              label="شهر"
              label-class="form-label"
              input-class="form-select"
              validation="required"
              :validation-messages="{
                required: 'فیلد شهر الزامی است.',
              }"
              messages-class="form-text text-danger"
              ref="cityEl"
            >
              <option
                v-for="city in props.cities.filter(
                  (item) => item.province_id == value.province_id
                )"
                :key="city.id"
                :value="city.id"
              >
                {{ city.name }}
              </option>
            </FormKit>
          </div>
          <div class="col-12 col-md-12">
            <FormKit
              rows="5"
              type="textarea"
              name="address"
              id="address"
              label="آدرس"
              label-class="form-label"
              input-class="form-control"
              validation="required"
              :validation-messages="{
                required: 'فیلد آدرس الزامی است.',
              }"
              messages-class="form-text text-danger"
            />
          </div>
        </div>
        <div>
          <FormKit type="submit" input-class="btn btn-primary mt-4">
            ایجاد
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
import { reset } from "@formkit/core";

const props = defineProps(["provinces", "cities"]);
const cityEl = ref(null);

function changeProvince(el) {
  const id = props.cities.find(
    (item) => item.province_id == el.target.value
  ).id;
  cityEl.value.node.input(id);
}

const loading = ref(false);
const toast = useToast();
const errors = ref([]);
async function create(formData) {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/create", {
      method: "POST",
      body: formData,
    });
    reset("createAddress");
    refreshGetAddress();
    toast.success("آدرس جدید با موفقیت ایجاد شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}

const refreshGetAddress = inject("refreshGetAddress");
</script>
