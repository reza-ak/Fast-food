<template>
  <section class="single_page_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="row gy-5">
            <div class="col-sm-12 col-lg-6">
              <h3 class="fw-bold mb-4">{{ product.data.name }}</h3>
              <h5 v-if="product.data.is_sale" class="mb-3">
                <del>{{ NumberFormat(product.data.price) }}</del>
                {{ NumberFormat(product.data.sale_price) }} تومان
                <div class="text-danger fs-6">
                  {{
                    SalePercent(product.data.price, product.data.sale_price)
                  }}% تخفیف
                </div>
              </h5>
              <h5 v-else>{{ NumberFormat(product.data.price) }} تومان</h5>
              <p>{{ product.data.description }}</p>

              <div class="mt-5 d-flex">
                <button class="btn-add">افزودن به سبد خرید</button>
                <div class="input-counter ms-4">
                  <span class="plus-btn"> + </span>
                  <div class="input-number">1</div>
                  <span class="minus-btn"> - </span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    v-for="(image, index) in product.data.images"
                    :key="index"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    :data-bs-slide-to="index + 1"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src="/preloader.png"
                      v-img="`/images/${product.data.primary_image}`"
                      :alt="product.data.name"
                      class="d-block w-100"
                    />
                  </div>
                  <div
                    v-for="(image, index) in product.data.images"
                    :key="index"
                    class="carousel-item"
                  >
                    <img
                      src="/preloader.png"
                      v-img="`/images/${image.image}`"
                      :alt="product.data.name"
                      class="d-block w-100"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr />
  <section class="food_section my-5">
    <div class="container">
      <div class="row gx-3">
        <div v-for="product in randomProduct.data" :key="product.id" class="col-sm-6 col-lg-3">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: product } = await useFetch(
  `${apiBase}/products/${route.params.slug}`
);

const { data: randomProduct } = await useFetch(
  `${apiBase}/random-products?count=4`
);
</script>
