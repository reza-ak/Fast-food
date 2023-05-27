<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>تصویر</th>
          <th>نام</th>
          <th>دسته بندی</th>
          <th>قیمت</th>
          <th>تعداد</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img
              src="/preloader.png"
              v-img="`/images/${product.primary_image}`"
              :alt="product.name"
              width="80"
              height="53"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ NumberFormat(product.price) }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.status }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink
                :to="`/products/${product.id}`"
                class="btn btn-sm btn-outline-dark me-2"
                >نمایش</NuxtLink
              >
              <NuxtLink
                :to="`/products/edit/${product.id}`"
                class="btn btn-sm btn-dark"
                >ویرایش</NuxtLink
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps(["products"]);
</script>
