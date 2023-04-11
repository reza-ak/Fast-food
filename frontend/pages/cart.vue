<template>
  <ClientOnly>
    <template #fallback>
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border text-secondary spinner-border-xl ms-2 cart-spinner" style="width: 3rem; height: 3rem;"></div>
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
                      <tr>
                        <th>
                          <img src="./images/b1.jpg" width="100" alt="" />
                        </th>
                        <td class="fw-bold">برگر گوشت ذغالی</td>
                        <td>
                          <span>45,000</span>
                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <div class="input-counter">
                            <span class="plus-btn"> + </span>
                            <div class="input-number">2</div>
                            <span class="minus-btn"> - </span>
                          </div>
                        </td>
                        <td>
                          <span>90,000</span>
                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <i
                            class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <img src="./images/p1.jpg" width="100" alt="" />
                        </th>
                        <td class="fw-bold">پیتزا پپرونی</td>
                        <td>
                          <div>
                            <del>135,000</del>
                            115,000 تومان
                          </div>
                          <div class="text-danger">10% تخفیف</div>
                        </td>
                        <td>
                          <div class="input-counter">
                            <span class="plus-btn"> + </span>
                            <div class="input-number">1</div>
                            <span class="minus-btn"> - </span>
                          </div>
                        </td>
                        <td>
                          <span>115,000</span>
                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <i
                            class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <img src="./images/p3.jpg" width="100" alt="" />
                        </th>
                        <td class="fw-bold">پیتزا رست بیف</td>
                        <td>
                          <div>165,000 تومان</div>
                        </td>
                        <td>
                          <div class="input-counter">
                            <span class="plus-btn"> + </span>
                            <div class="input-number">2</div>
                            <span class="minus-btn"> - </span>
                          </div>
                        </td>
                        <td>
                          <span>330,000</span>
                          <span class="ms-1">تومان</span>
                        </td>
                        <td>
                          <i
                            class="bi bi-x text-danger fw-bold fs-4 cursor-pointer"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button class="btn btn-primary mb-4">پاک کردن سبد خرید</button>
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
import { useCartStore } from "~~/stores/cart";

const cart = useCartStore();
const countCartItems = computed(() => cart.count);
</script>
