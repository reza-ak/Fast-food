<template>
  <div class="d-flex align-items-center">
    <div class="mt-3 px-2" v-if="!showResendOtp">
      <ClientOnly>
        <vue-countdown
          :time="2 * 60 * 1000"
          :transform="transformSlotProps"
          @end="onCountdownEnd"
          v-slot="{ minutes, seconds }"
        >
          {{ seconds }} : {{ minutes }}
        </vue-countdown>
      </ClientOnly>
    </div>
    <button
      @click="resend()"
      v-else
      type="submit"
      class="btn btn-dark"
      :disabled="loading"
    >
      ارسال دوباره
      <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
    </button>
  </div>
</template>

<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { useToast } from "vue-toastification";

const toast = useToast();
const emit = defineEmits(["resendOtpErrors"]);

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

const loading = ref(false);
async function resend() {
  try {
    loading.value = true;
    await $fetch("/api/auth/resendOtp", {
      method: "POST",
    });
    toast.success("کد ورود دوباره برای شما ارسال شد.");
    showResendOtp.value = false;
  } catch (error) {
    emit("resendOtpErrors", Object.values(error.data.data.message).flat());
  } finally {
    loading.value = false;
  }
}
</script>
