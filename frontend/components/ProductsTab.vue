<template>
  <!-- food section -->
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>منو محصولات</h2>
      </div>

      <tabs
        nav-class="filters_menu"
        nav-item-active-class="active"
        :options="{ disableScrollBehavior: true }"
      >
        <tab
          v-for="(tabList, index) in productsTab.data.tabList"
          :name="tabList"
          :key="index"
        >
          <div class="filters_content">
            <div class="row grid">
              <div
                v-for="(product, indexProduct) in productsTab.data.tabPanel[
                  index
                ]"
                :key="indexProduct"
                class="col-sm-6 col-lg-4"
              >
                <ProductCard :product="product" />
              </div>
            </div>
          </div>
        </tab>
      </tabs>

      <div class="btn-box">
        <a href=""> مشاهده بیشتر </a>
      </div>
    </div>
  </section>
  <!-- end food section -->
</template>

<script setup>
import { Tabs, Tab } from "vue3-tabs-component";
const {
  public: { apiBase },
} = useRuntimeConfig();
const { data: productsTab, error } = await useFetch(
  `${apiBase}/products/products-tabs`
);
</script>
