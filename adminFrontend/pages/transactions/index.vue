<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">تراکنش ها</h4>
  </div>

  <TransactionList :transactions="transactions.transactions"/>

  <div class="d-flex justify-content-center">
    <nav aria-label="navigation">
      <ul class="pagination">
        <li
          v-for="(link, index) in transactions.meta.links.slice(1, -1)"
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
definePageMeta({
  middleware: "auth",
});

const page = ref(0)

const { data: transactions, refresh } = await useFetch(() => "/api/global", {
  query: { url: "/transactions", page: page },
  headers: useRequestHeaders(["cookie"]),
});

function paginate(number) {
  page.value = number;
  refresh();
}
</script>
