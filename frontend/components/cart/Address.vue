<template>
  <template v-if="addresses?.length != 0">
    <div>انتخاب آدرس</div>
    <select
      style="width: 200px"
      class="form-select ms-3"
      aria-label="Default select example"
      @change="(el) => emit('setAddressId', el.target.value)"
    >
    <option value="" selected>--</option>
      <option
        v-for="address in addresses"
        :value="address.id"
        :key="address.id"
      >
      </option>
    </select>
  </template>
  <NuxtLink v-else to="/profile/addresses" class="btn btn-primary">
    ایجاد آدرس
  </NuxtLink>
</template>

<script setup>
const emit = defineEmits(['setAddressId'])
const { data: addresses } = await useFetch("/api/cart/addresses");
</script>
