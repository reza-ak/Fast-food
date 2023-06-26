import { readFiles } from 'h3-formidable'
import FormData from 'form-data'
import fs from 'fs'
export default defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = getCookie(event, 'token')
  // const body = await readBody(event) 
  // چون فایل داریم و به صورت formData هست نمیتوان به صورت بالا اطلاعات را دریافت کرد برای این کار از پکیج h3-formidable استفاده میکنیم که سمت node js هست
  const { fields, files } = await readFiles(event, {
    includeFields: true,
  })
  // دوباره باید این اطلاعات به formData تبدیل شود تا به سرور ارسال شود ولی در اینجا نمیتوان از کلاس formData استفاده کرد چون مخصوص جاوااسکریپت است و برای node js نیست بخاطر همین از پکیج form-data استفاده میکنیم

  try {
    let formData = new FormData();
    formData.append("primary_image", fs.createReadStream(files.primary_image[0].filepath)); // fs یک ماژول مربوط به node js هست
    formData.append("name", fields.name[0]);
    formData.append("category_id", fields.category_id[0]);
    formData.append("status", fields.status[0]);
    formData.append("price", fields.price[0]);
    formData.append("quantity", fields.quantity[0]);
    formData.append("sale_price", fields.sale_price[0]);
    formData.append("date_on_sale_from", fields.date_on_sale_from[0]);
    formData.append("date_on_sale_to", fields.date_on_sale_to[0]);
    formData.append("description", fields.description[0]);
    for (let index = 0; index < files.images.length; index++) {
      formData.append("images[]", fs.createReadStream(files.images[index].filepath)); // fs یک ماژول مربوط به node js هست
    }

    const data = await $fetch(`${apiBase}/products`, {
      method: 'POST',
      body: formData,
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