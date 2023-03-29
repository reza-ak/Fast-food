<template>
  <!-- login section -->
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <AuthCheckOtp v-if="showCheckOtpForm"/>
            <AuthLogin v-else @showCheckOtpForm="checkOtp()"/>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end login section -->
</template>

<script setup>
  definePageMeta({
    middleware: 'guest'
  })

  const showCheckOtpForm = ref(false)
  function checkOtp() {
    showCheckOtpForm.value = true
  }
</script>

