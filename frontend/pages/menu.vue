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
                v-model="search"
              />
              <button
                @click="handleFilter({ search: search })"
                class="input-group-text"
                id="basic-addon2"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>

          <hr />

          <div class="filter-list">
            <div class="form-label">دسته بندی</div>
            <ul>
              <li
                v-for="category in categories.data"
                :key="category.id"
                class="my-2 cursor-pointer"
                @click="handleFilter({ category: category.id })"
                :class="{'filter-list-active' : route.query.category == category.id}"
              >
                {{ category.name }}
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
                :checked="route.query.sortBy == 'max'"
                @click="handleFilter({ sortBy: 'max' })"
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
                :checked="route.query.sortBy == 'min'"
                @click="handleFilter({ sortBy: 'min' })"
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
                :checked="route.query.sortBy == 'bestseller'"
                @click="handleFilter({ sortBy: 'bestseller' })"
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
                :checked="route.query.sortBy == 'sale'"
                @click="handleFilter({ sortBy: 'sale' })"
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
          <div
            v-if="pending"
            class="d-flex justify-content-center align-items-center h-100"
          >
            <div class="spinner-border"></div>
          </div>

          <div class="h-100" v-else>
            <div
              v-if="products.data.products.length == 0"
              class="d-flex justify-content-center align-items-center h-100"
            >
              <p>محصولی یافت نشد!</p>
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
                    v-for="(link, index) in products.data.meta.links.slice(
                      1,
                      -1
                    )"
                    :key="index"
                    class="page-item"
                    :class="{ active: link.active }"
                  >
                    <button
                      @click="handleFilter({ page: link.label })"
                      class="page-link"
                    >
                      {{ link.label }}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end food section -->
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const query = ref({});
const {public: { apiBase }} = useRuntimeConfig();

query.value = route.query;
const { data: categories } = await useFetch(`${apiBase}/categories`);

const {data: products, refresh, pending,} = await useFetch(() => `${apiBase}/menu`, {
  query: query,
});

watch(route,() => {
  if(Object.keys(route.query).length == 0){
    query.value = {}
    refresh()
  }
})

function handleFilter(param) {
  query.value = { ...route.query, ...param };
  if(!param.hasOwnProperty('page')){
    delete query.value.page
  }
  router.push({
    path: "/menu",
    query: query.value,
  });
}
</script>
