<template>
  <div class="sub_page">
    <div class="hero_area">
      <!-- header section strats -->
      <header class="header_section">
        <div class="container">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <NuxtLink @click="closeMenu" class="navbar-brand" href="/">
              <h1 class="fw-bold h2 text-light my-0">FoodWeb</h1>
            </NuxtLink>

            <button
              class="navbar-toggler p-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              ref="navToggle"
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav mx-auto">
                <li class="nav-item" :class="{ active: $route.path === '/' }">
                  <NuxtLink @click="closeMenu" to="/" class="nav-link"
                    >صفحه اصلی</NuxtLink
                  >
                </li>
                <li
                  class="nav-item"
                  :class="{ active: $route.path === '/menu' }"
                >
                  <NuxtLink @click="closeMenu" to="/menu" class="nav-link"
                    >منو</NuxtLink
                  >
                </li>
                <li
                  class="nav-item"
                  :class="{ active: $route.path === '/about-us' }"
                >
                  <NuxtLink @click="closeMenu" to="/about-us" class="nav-link"
                    >درباره ما</NuxtLink
                  >
                </li>
                <li
                  class="nav-item"
                  :class="{ active: $route.path === '/contact-us' }"
                >
                  <NuxtLink @click="closeMenu" to="/contact-us" class="nav-link"
                    >تماس باما</NuxtLink
                  >
                </li>
              </ul>
              <div class="user_option">
                <NuxtLink
                  @click="closeMenu"
                  class="cart_link position-relative"
                  to="/cart"
                >
                  <i class="bi bi-cart-fill text-white fs-5"></i>
                  <ClientOnly>
                    <span
                      class="position-absolute top-0 translate-middle badge rounded-pill"
                    >
                      {{ countCartItems }}
                    </span>
                  </ClientOnly>
                </NuxtLink>
                <NuxtLink
                  @click="closeMenu"
                  v-if="authUser === null"
                  to="/auth/login"
                  class="btn-auth"
                >
                  ورود
                </NuxtLink>
                <NuxtLink
                  @click="closeMenu"
                  v-else
                  to="/profile"
                  class="btn-auth"
                >
                  پروفایل
                </NuxtLink>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <!-- end header section -->
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~~/stores/cart";

const { authUser } = useAuth();

const cart = useCartStore();
const countCartItems = computed(() => cart.count);

const { $bootstrap } = useNuxtApp();
const navToggle = ref(null);
function closeMenu() {
  const bsCollapse = new $bootstrap.Collapse(navToggle.value, {
    toggle: false,
  });
  bsCollapse.hide();
}
</script>
