export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = getCookie(event,'token')
  
  try {
    const data = await $fetch(`${apiBase}/auth/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'aplication/json',
        'Authorization': `Bearer ${token}`
      }
    })
    setCookie(event, "token", "",{
      httpOnly: true,
      secure: true,
      maxAge: new Date(0),
      path: '/'
    })
    return (data)
    
  } catch (error) {
    return (error)
  }
})