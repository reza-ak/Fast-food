export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { public: { apiBase } } = useRuntimeConfig()
  const login_token = getCookie(event,'login_token')

  try {
    const data = await $fetch(`${apiBase}/auth/check-otp`, {
      method: 'POST',
      body: {...body, "login_token": login_token},
      headers: {
        'Accept': 'aplication/json',
      }
    })

    setCookie(event, "token", data.data.token,{
      httpOnly: true,
      secure: true,
      maxAge: 60*60*24*7, // 1 week
      path: '/'
    })

    setCookie(event, "login_token", " ",{
      httpOnly: true,
      secure: true,
      maxAge: new Date(0),
      path: '/'
    })
    return (data.data.user)

  } catch (error) {
    return (error)
  }
})