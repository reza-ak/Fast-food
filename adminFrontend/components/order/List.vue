<template>
  <div class="table-responsive">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>شماره سفارش</th>
          <th>وضعیت</th>
          <th>وضعیت پرداخت</th>
          <th>مبلغ پرداختی</th>
          <th>تاریخ ایجاد</th>
          <th>محصولات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in props.orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.payment_status }}</td>
          <td>{{ NumberFormat(order.paying_amount) }}</td>
          <td>{{ order.created_at }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-dark"
              data-bs-toggle="modal"
              :data-bs-target="`#modal-${order.id}`"
            >
              نمایش
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
                          v-for="orderItem in order.order_items"
                          :key="orderItem.id"
                        >
                          <th>
                            <img
                              src="/preloader.png"
                              v-img="`${orderItem.product_primary_image}`"
                              width="80"
                            />
                          </th>
                          <td class="fw-bold">{{ orderItem.product_name }}</td>
                          <td>{{ NumberFormat(orderItem.price) }} تومان</td>
                          <td>{{ orderItem.quantity }}</td>
                          <td>{{ NumberFormat(orderItem.subtotal) }} تومان</td>
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
</template>

<script setup>
const props = defineProps(["orders"]);
</script>
