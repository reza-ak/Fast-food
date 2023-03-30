<template>
  <NuxtLayout name="profile">
    <NuxtPage /> <!-- صفحاتی که داخل پوشه به اسم همین فایل وجود دارند را میتوان با این دستور نشان داد -->
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
