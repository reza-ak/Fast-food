<template>
  <div
    v-if="pending"
    class="d-flex justify-content-center align-items-center h-100"
  >
    <div class="spinner-border"></div>
  </div>
  <div v-else>
    <div
      v-if="data.transactions.length == 0"
      class="d-flex justify-content-center align-items-center h-100"
    >
      <h5>تراکنشی یافت نشد !</h5>
    </div>
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>مبلغ</th>
            <th>وضعیت</th>
            <th>شماره پیگیری</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in data.transactions" :key="transaction.id">
            <th>{{ transaction.id }}</th>
            <td>{{ NumberFormat(transaction.amount) }} تومان</td>
            <td>
              <span
                :class="{
                  'text-success': transaction.status == 'موفق',
                  'text-danger': transaction.status == 'ناموفق',
                }"
                >{{ transaction.status }}</span
              >
            </td>
            <td>{{ transaction.trans_id }}</td>
            <td>{{ transaction.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav class="d-flex justify-content-center mt-5">
      <ul class="pagination">
        <li
          v-for="(link, index) in data.meta.links.slice(1, -1)"
          :key="index"
          class="page-item"
          :class="{ active: link.active }"
        >
          <button @click="paginate(link.label)" class="page-link">
            {{ link.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const page = ref(0);
const { data, refresh, pending } = await useFetch(
  () => "/api/profile/transactions",
  {
    query: { page: page },
    headers: useRequestHeaders(["cookie"]),
  }
);

function paginate(number) {
  page.value = number;
  refresh();
}
</script>
