<template>
  <!-- food section -->
  <section class="food_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-3">
          <div>
            <label class="form-label">جستجو</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="نام محصول ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <a href="#" class="input-group-text" id="basic-addon2">
                <i class="bi bi-search"></i>
              </a>
            </div>
          </div>
          <hr />
          <div class="filter-list">
            <div class="form-label">دسته بندی</div>
            <ul>
              <li
                v-for="categorie in categories.data"
                :key="categorie.id"
                class="my-2 cursor-pointer filter-list-active"
              >
                {{ categorie.name }}
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <label class="form-label">مرتب سازی</label>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault1"
              >
                بیشترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault2"
              >
                کمترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault3"
              >
                پرفروش ترین
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault4"
              >
                با تخفیف
              </label>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-lg-9">
          <div v-if="pending" class="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border"></div>
          </div>

          <div v-else>
            <div class="row gx-3">
              <div
                v-for="product in products.data.products"
                :key="product.id"
                class="col-sm-6 col-lg-4"
              >
                <ProductCard :product="product" />
              </div>
            </div>
  
            <nav class="d-flex justify-content-center mt-5">
              <ul class="pagination">
                <li
                  v-for="(link, index) in products.data.meta.links.slice(1, -1)"
                  :key="index"
                  class="page-item"
                  :class="{ active: link.active }"
                >
                  <button @click="pagination(link.label)" class="page-link">
                    {{ link.label }}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end food section -->
</template>

<script setup>
const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: categories } = await useFetch(`${apiBase}/categories`);

const query = ref({})
const { data: products, refresh, pending } = await useFetch(() => `${apiBase}/menu`,{
  query: query
});
function pagination(pageNumber) {
  query.value = {page: pageNumber}
  refresh()
}
</script>
