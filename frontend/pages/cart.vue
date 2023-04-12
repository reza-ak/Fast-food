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

    <div v-if="countCartItems == 0" class="cart-empty">
      <div class="text-center text-muted">
        <div>
          <i class="bi bi-basket-fill" style="fontsize: 40px"></i>
        </div>
        <h4 class="text-bold my-4">سبد خرید شما خالی است.</h4>
        <NuxtLink to="/menu" class="btn btn-outline-dark mt-3">
          مشاهده محصولات
        </NuxtLink>
      </div>
    </div>

    <section v-else class="single_page_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="row gy-5">
              <div class="col-12">
                <div class="table-responsive">
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
                      <tr v-for="item in cartItems" :key="item.id">
                        <th>
                          <img
                            src="/preloader.png"
                            v-img="`/images/${item.primary_image}`"
                            :alt="item.name"
                            width="100"
                          />
                        </th>
                        <td class="fw-bold">{{ item.name }}</td>
                        <td>
                          <span v-if="item.is_sale">
                            <del>{{ NumberFormat(item.price) }}</del>
                            {{ NumberFormat(item.sale_price) }}
                          </span>
                          <span v-else>
                            {{ NumberFormat(item.price) }}
                          </span>
                          <span class="ms-1">تومان</span>
                          <div v-if="item.is_sale" class="text-danger">
                            {{ SalePercent(item.price, item.sale_price) }} %
                            تخفیف
                          </div>
                        </td>
                        <td>
                          <div class="input-counter">
                            <span
                              class="plus-btn"
                              @click="
                                () =>
                                  item.qty < item.quantity &&
                                  cart.increment(item.id)
                              "
                            >
                              +
                            </span>
                            <div class="input-number">{{ item.qty }}</div>
                            <span
                              class="minus-btn"
                              @click="item.qty > 1 && cart.decrement(item.id)"
                            >
                              -
                            </span>
                          </div>
                        </td>
                        <td>
                          <span v-if="item.is_sale">
                            {{ NumberFormat(item.sale_price * item.qty) }}
                          </span>
                          <span v-else>
                            {{ NumberFormat(item.price * item.qty) }}
                          </span>
                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <i
                            @click="removeFromCart(item.id)"
                            class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button @click="cart.clear()" class="btn btn-primary mb-4">پاک کردن سبد خرید</button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 col-md-6">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="کد تخفیف"
                  />
                  <button class="input-group-text" id="basic-addon2">
                    اعمال کد تخفیف
                  </button>
                </div>
              </div>
              <div
                class="col-12 col-md-6 d-flex justify-content-end align-items-baseline"
              >
                <div>انتخاب آدرس</div>
                <select
                  style="width: 200px"
                  class="form-select ms-3"
                  aria-label="Default select example"
                >
                  <option selected>منزل</option>
                  <option value="1">محل کار</option>
                </select>
                <a href="profile.html" class="btn btn-primary"> ایجاد آدرس </a>
              </div>
            </div>
            <div class="row justify-content-center mt-5">
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-body p-4">
                    <h5 class="card-title fw-bold">مجموع سبد خرید</h5>
                    <ul class="list-group mt-4">
                      <li
                        class="list-group-item d-flex justify-content-between"
                      >
                        <div>مجموع قیمت :</div>
                        <div>535,000 تومان</div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between"
                      >
                        <div>
                          تخفیف :
                          <span class="text-danger ms-1">10%</span>
                        </div>
                        <div class="text-danger">53,500 تومان</div>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between"
                      >
                        <div>قیمت پرداختی :</div>
                        <div>481,500 تومان</div>
                      </li>
                    </ul>
                    <button class="user_option btn-auth mt-4">پرداخت</button>
                  </div>
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
import { useToast } from "vue-toastification";
import { useCartStore } from "~~/stores/cart";

definePageMeta({
  middleware: 'auth'
})

const toast = useToast();
const cart = useCartStore();
const countCartItems = computed(() => cart.count);
const cartItems = computed(() => cart.allItems);

function removeFromCart(id) {
  cart.remove(id);
  toast.warning("محصول مورد نظر از سبد خرید شما حذف شد.");
}
</script>
