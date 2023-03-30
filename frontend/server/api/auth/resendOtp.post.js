export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const loginToken = getCookie(event, "login_token")
  try {
    const data = await $fetch(`${apiBase}/auth/resend-otp`, {
      method: 'POST',
      body: {"login_token": loginToken},
      headers: {
        'Accept': 'aplication/json',
      }
    })
    setCookie(event, "login_token", data.data.login_token,{
      httpOnly: true,
      secure: true,
      maxAge: 60*60*24*7, // 1 week
      path: '/'
    })
    return ("resend success")

  } catch (error) {
    return (error)
  }
})