<template>
  <div class="d-flex align-items-center">
    <div class="mt-3 px-2" v-if="!showResendOtp">
      <ClientOnly>
        <vue-countdown
          :time="2 * 2 * 1000"
          :transform="transformSlotProps"
          @end="onCountdownEnd"
          v-slot="{ minutes, seconds }"
        >
          {{ seconds }} : {{ minutes }}
        </vue-countdown>
      </ClientOnly>
    </div>
    <button v-else type="submit" class="btn btn-dark" :disabled="loading">
      ارسال دوباره
      <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
  </div>
</template>

<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";

function transformSlotProps(props) {
  const formattedProps = {};
  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });
  return formattedProps;
}

const showResendOtp = ref(false);
function onCountdownEnd(params) {
  showResendOtp.value = true;
}

// import { useToast } from "vue-toastification";
// const toast = useToast();
// const otp = ref(null);
// const errors = ref([]);
// const loading = ref(false);
// const { authUser } = useAuth();

// async function checkOtp() {
//   if (otp.value == null) {
//     toast.error("کد ورود الزامی است.");
//     return;
//   }
//   const pattern = /^[0-9]{6}$/;
//   if (!pattern.test(otp.value)) {
//     toast.error("فرمت کد ورود معتبر نیست.");
//     return;
//   }
//   try {
//     loading.value = true;
//     const data = await $fetch("/api/auth/checkOtp", {
//       method: "POST",
//       body: { otp: otp.value },
//     });
//     toast.success("با موفقیت وارد شدید.");
//     authUser.value = data;
//   } catch (error) {
//     errors.value = Object.values(error.data.data.message).flat();
//   } finally {
//     loading.value = false;
//   }
// }
</script>
