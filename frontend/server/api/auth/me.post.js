export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = getCookie(event,'token')
  
  try {
    const data = await $fetch(`${apiBase}/auth/me`, {
      method: 'POST',
      headers: {
        'Accept': 'aplication/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return (data.data)
    
  } catch (error) {
    if(error.stausCode == 401){
      setCookie(event, "token", " ",{
        httpOnly: true,
        secure: true,
        maxAge: new Date(0),
        path: '/'
      })
    }
    return (error)
  }
})