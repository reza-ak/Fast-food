import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast()

export const useCartStore = defineStore('cart', {
  state() {
    return {
      cart: []
    }
  },

  getters: {
    count(state) {
      return state.cart.length
    },
    allItems(state) {
      return state.cart
    },
    totalAmount(state) {
      return state.cart.reduce((total, product) => {
        return product.is_sale ? total + (product.sale_price * product.qty) : total + (product.price * product.qty)
      }, 0)  // 0 is refers to total and product refers to each product in the cart
      // reduce is a java script function
    }
  },

  actions: {
    addToCart(product, count) {
      if (product.quantity == 0) {
        toast.error('متاسفانه این محصول وجود ندارد.')
        return ""
      } else {
        this.cart.push({
          ...product,
          qty: count
        })
        toast.success('محصول به سبد خرید اضافه شد.')
      }
    },

    addToCartNoMessage(product, count) {
      this.cart.push({
        ...product,
        qty: count
      })
    },

    remove(id) {
      this.cart = this.cart.filter(product => product.id != id)
    },

    increment(id) {
      const item = this.cart.find(product => product.id == id)
      if (item) {
        if (item.qty < item.quantity) {
          item.qty++
        }
      }
    },

    decrement(id) {
      const item = this.cart.find(product => product.id == id)
      if (item) {
        if (item.quantity > 1) {
          item.qty--
        }
      }
    },

    clear() {
      this.cart = []
    }
  },

  // با استفاده از کتابخانه pinia-plugin-persistedstate/nuxt و کد زیر اطلاعات موجود در state در داخل local storage قرار میگیرد 
  // به دلیل استفاده nuxt از ssr از کتابخانه زیر استفاده میشود
  persist: {
    storage: persistedState.localStorage, // client only
    key: 'shopping-cart' // Rename in local storage
  },
})