<template>
  <!-- contact section -->
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>تماس با ما</h2>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <div v-if="errors.length > 0" class="alert alert-danger">
              <ul class="mb-0">
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <form @submit.prevent="contactUs()">
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="نام و نام خانوادگی"
                  v-model="formData.name"
                />
              </div>
              <div>
                <input
                  type="email"
                  class="form-control"
                  placeholder="ایمیل"
                  v-model="formData.email"
                />
              </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="موضوع پیام"
                  v-model="formData.subject"
                />
              </div>
              <div>
                <textarea
                  rows="10"
                  style="height: 100px"
                  class="form-control"
                  placeholder="متن پیام"
                  v-model="formData.text"
                ></textarea>
              </div>
              <div class="btn_box">
                <button>
                  ارسال پیام
                  <div
                    v-if="loading"
                    class="spinner-border spinner-border-sm ms-2"
                  ></div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container">
            <div id="map" style="height: 345px"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end contact section -->
</template>

<script setup>
import { useToast } from "vue-toastification";

const {
  public: { apiBase },
} = useRuntimeConfig();

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  text: "",
});

const errors = ref([]);
const loading = ref(false);
const toast = useToast();
async function contactUs() {
  if(formData.name == "" || formData.email == "" || formData.subject == "" || formData.text == ""){
    toast.error("لطفا همه اطلاعات خواسته شده را وارد کنید.");
    return
  }
  try {
    loading.value = true;
    errors.value = [];
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: "POST",
      body: formData,
    });
    toast.success("پیام شما با موفقیت ثبت شد.");
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>
