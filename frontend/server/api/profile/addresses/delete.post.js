export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = getCookie(event, 'token')
  const body = await readBody(event)
  try {
    const data = await $fetch(`${apiBase}/profile/addresses/delete`, {
      method: 'POST',
      body: body,
      headers: {
        'Accept': 'aplication/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return (data.data)

  } catch (error) {
    return (error)
  }
})