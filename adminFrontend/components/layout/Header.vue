<template>
  <header
    class="navbar text-center navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">webprog.io</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="w-100"></div>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap d-flex align-items-center">
        <span class="nav-link">{{ authUser.name }}</span>
        <a @click="logout" class="nav-link px-3" href="#">خروج</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const toast = useToast()
const {authUser} = useAuth()
async function logout() {
  const { data } = await useFetch("/api/auth/logout", {
    method: "POST",
  });
  
  authUser.value = null
  toast.warning("از حساب کاربری خود خارج شدید.")
  return navigateTo('/auth/login')
}
</script>
