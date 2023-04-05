<template>
  <div
    v-if="pending"
    class="d-flex justify-content-center align-items-center h-100"
  >
    <div class="spinner-border"></div>
  </div>
  <div v-else>
    <div v-if="data.orders.length == 0" class="d-flex justify-content-center align-items-center h-100">
      <h5>سفارشی یافت نشد !</h5>
    </div>
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th>آدرس</th>
            <th>وضعیت</th>
            <th>وضعیت پرداخت</th>
            <th>قیمت کل</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in data.orders" :key="order.id">
            <th>{{ order.id }}</th>
            <td>{{ order.address_title }}</td>
            <td>{{ order.status }}</td>
            <td>
              <span
                :class="{
                  'text-success': order.payment_status == 'موفق',
                  'text-danger': order.payment_status == 'ناموفق',
                }"
                >{{ order.payment_status }}</span
              >
            </td>
            <td>{{ NumberFormat(order.paying_amount) }} تومان</td>
            <td>{{ order.created_at }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                :data-bs-target="`#modal-${order.id}`"
              >
                محصولات
              </button>
              <div class="modal fade" :id="`modal-${order.id}`">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h6 class="modal-title">
                        محصولات سفارش شماره {{ order.id }}
                      </h6>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <table class="table align-middle">
                        <thead>
                          <tr>
                            <th>محصول</th>
                            <th>نام</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>قیمت کل</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="product in order.order_items"
                            :key="product.id"
                          >
                            <th>
                              <img
                                src="/preloader.png"
                                v-img="
                                  `/images/${product.product_primary_image}`
                                "
                                :alt="product.product_name"
                                width="80"
                              />
                            </th>
                            <td class="fw-bold">{{ product.product_name }}</td>
                            <td>{{ NumberFormat(product.price) }} تومان</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ NumberFormat(product.subtotal) }} تومان</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </td>
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
const { data, refresh, pending } = await useFetch(() => "/api/profile/orders", {
  query: { page: page },
  headers: useRequestHeaders(["cookie"]),
});

function paginate(number) {
  page.value = number;
  refresh();
}
</script>
