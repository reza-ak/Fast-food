<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">کاربر : {{ user.name }}</h4>
  </div>

  <div>
    <div class="row gy-4">
      <div class="col-md-3">
        <label class="form-label">نام</label>
        <input
          type="text"
          class="form-control"
          disabled
          :placeholder="user.name"
        />
      </div>
      <div class="col-md-3">
        <label class="form-label">ایمیل</label>
        <input
          type="text"
          class="form-control"
          disabled
          :placeholder="user.email"
        />
      </div>
      <div class="col-md-3">
        <label class="form-label">شماره تماس</label>
        <input
          type="text"
          class="form-control"
          disabled
          :placeholder="user.cellphone"
        />
      </div>
    </div>
  </div>

  <button class="btn btn-dark mt-5">حذف</button>
</template>

<script setup>
const route = useRoute();

const { data: user } = await useFetch(() => "/api/global", {
  query: { url: `/users/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});
</script>
