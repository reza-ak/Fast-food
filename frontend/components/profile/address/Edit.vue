<template>
  <FormKit
    type="form"
    @submit="edit"
    :incomplete-message="false"
    :actions="false"
    #default="{ value }"
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
            :value="props.address.title"
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
            :value="props.address.cellphone"
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
            :value="props.address.postal_code"
          />
        </div>
        <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
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
              :value="props.address.province_id"
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
              :value="props.address.city_id"
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
        </ClientOnly>
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
            :value="props.address.address"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <FormKit type="submit" input-class="btn btn-primary mt-4">
          ویرایش
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </FormKit>
        <ProfileAddressDelete :addressId="props.address.id" />
      </div>
    </div>
  </FormKit>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps(["address", "provinces", "cities"]);
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
async function edit(formData) {
  try {
    loading.value = true;
    errors.value = [];
    await $fetch("/api/profile/addresses/edit", {
      method: "POST",
      body: { ...formData, address_id: props.address.id },
    });
    toast.success("آدرس جدید با موفقیت ویرایش شد.");
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
