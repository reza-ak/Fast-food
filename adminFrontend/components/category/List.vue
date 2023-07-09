<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>نام</th>
          <th>توضیحات</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in props.categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink :to="`/categories/${category.id}`" class="btn btn-sm btn-outline-dark me-2">نمایش</NuxtLink>
              <NuxtLink :to="`/categories/edit/${category.id}`" class="btn btn-sm btn-dark">ویرایش</NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps(["categories"]);
</script>
