<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h4 class="fw-bold">داشبورد</h4>
  </div>

  <ClientOnly>
    <Chart :data="chartData"/>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const { data: chartData } = await useFetch("/api/global", {
  query: { url: "/transactions/chart" },
  headers: useRequestHeaders(["cookie"]),
});
</script>
