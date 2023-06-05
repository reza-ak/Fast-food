<template>
  <div class="row">
    <div class="d-flex justify-content-center pb-5">
      <div v-if="primaryImage" class="position-relative">
        <img
          :src="primaryImage"
          width="350"
          height="220"
          alt="primary image"
        />
        <div class="position-absolute remove-icon-image">
          <i
            @click="removeImage"
            class="bi bi-x text-danger fs-2 cursor-pointer"
          ></i>
        </div>
      </div>
      <div v-else>
        <div class="position-relative">
          <div
            v-if="loading"
            class="spinner-border text-primary position-absolute"
          ></div>

          <FormKit
            v-else
            type="file"
            name="primary_image"
            id="primary_image"
            label="تصویر اصلی"
            accept=".jpg, .png, .jpeg, .webp"
            multiple="false"
            label-class="form-label"
            input-class="form-control"
            @change="imageFile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['setPrimaryImage']);
const primaryImage = ref(null);
const loading = ref(false);

function imageFile(el) {
  loading.value = true;
  const reader = new FileReader();
  reader.readAsDataURL(el.target.files[0]);
  reader.onloadend = () => {
    primaryImage.value = reader.result.toString();
    loading.value = false;
  };
  emit('setPrimaryImage', el.target.files[0]);
}

function removeImage() {
  primaryImage.value = null;
  emit('setPrimaryImage', null);
}
</script>
