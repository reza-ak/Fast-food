export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = getCookie(event,'token')
  const query = getQuery(event)

  try {
    const data = await $fetch(`${apiBase}${query.url}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'aplication/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return data.data
    
  } catch (error) {
    return error
  }
})