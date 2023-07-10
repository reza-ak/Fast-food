<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>کد</th>
          <th>درصد</th>
          <th>تاریخ انقضا</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percentage }}</td>
          <td>{{ coupon.expired_at_jalali }}</td>
          <td>{{ coupon.created_at }}</td>
          <td>
            <div class="d-flex">
              <NuxtLink :to="`/coupons/${coupon.id}`" class="btn btn-sm btn-outline-dark me-2">نمایش</NuxtLink>
              <NuxtLink :to="`/coupons/edit/${coupon.id}`" class="btn btn-sm btn-dark">ویرایش</NuxtLink>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps(["coupons"]);
</script>
