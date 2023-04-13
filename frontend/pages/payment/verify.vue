<template>
  <ClientOnly>
    <template #fallback>
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div
          class="spinner-border text-secondary spinner-border-xl ms-2 cart-spinner"
          style="width: 3rem; height: 3rem"
        ></div>
      </div>
    </template>
    <section class="auth_section">
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-5 offset-md-4">
            <div v-if="errors.length > 0" class="alert alert-danger">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="text-center mb-5">
                  <template v-if="payment.status">
                    <i class="bi bi-check-circle-fill text-success fs-1"></i>
                    <h5 class="mt-3 text-success">
                      پرداخت شما با موفقیت انجام شد
                    </h5>
                    <h6 class="mt-3">
                      شماره پیگیری : <span>{{ payment.transId }}</span>
                    </h6>
                  </template>
                  <template v-else>
                    <i class="bi bi-x-circle-fill text-danger fs-1"></i>
                    <h5 class="mt-3 text-danger">{{ payment.error }}</h5>
                  </template>
                </div>
                <div class="d-flex justify-content-between">
                  <NuxtLink
                    v-if="payment.status"
                    to="/profile/orders"
                    class="btn btn-primary"
                    >مشاهده سفارش</NuxtLink
                  >
                  <NuxtLink
                    v-else="payment.status"
                    to="/cart"
                    class="btn btn-primary"
                    >مشاهده سبد خرید</NuxtLink
                  >
                  <NuxtLink to="/" class="btn btn-dark"
                    >بازگشت به سایت</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';

definePageMeta({
  middleware: "auth",
});

const {
  public: { apiBase },
} = useRuntimeConfig();
const route = useRoute();
const errors = ref([]);
const payment = ref(null);
const cart = useCartStore()

if (process.client) {
  try {
    const data = await $fetch(`${apiBase}/payment/verify`, {
      method: "POST",
      body: {
        token: route.query.token,
        status: route.query.status,
      },
    });
    payment.value = data.data;
    if (payment.value.status) {
      cart.clear()
    }
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  }
}
</script>
