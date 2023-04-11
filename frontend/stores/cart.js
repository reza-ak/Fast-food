import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast()

export const useCartStore = defineStore('cart', {
  state() {
    return {
      cart: []
    }
  },

  actions: {
    addToCart(product, count){
      this.cart.push({
        ...product,
        qty: count
      })
      toast.success('محصول به سبد خرید اضافه شد.')
      console.log(this.cart);
    },

    remove(id){
      this.cart = this.cart.filter(product => product.id != id)
    }
  }
})