import { create } from "zustand";

export const useCartProducts = create((set) => ({
  cartProducts: [],

  // Agregar producto al carrito (si ya está, aumentamos la cantidad)
  addToCart: (product) =>
    set((state) => {
      const productIndex = state.cartProducts.findIndex((item) => item.id === product.id);
      if (productIndex === -1) {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        return { cartProducts: [...state.cartProducts, { ...product, quantity: 1 }] };
      } else {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        const updatedCart = [...state.cartProducts];
        updatedCart[productIndex].quantity += 1;
        return { cartProducts: updatedCart };
      }
    }),

  // Eliminar producto del carrito (si la cantidad es mayor a 1, restamos una unidad)
  removeFromCart: (productId) =>
    set((state) => {
      const productIndex = state.cartProducts.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        const updatedCart = [...state.cartProducts];
        if (updatedCart[productIndex].quantity > 1) {
          // Si la cantidad es mayor que 1, restamos una unidad
          updatedCart[productIndex].quantity -= 1;
        } else {
          // Si la cantidad es 1, eliminamos el producto del carrito
          updatedCart.splice(productIndex, 1);
        }
        return { cartProducts: updatedCart };
      }
    }),

  // Limpiar carrito
  clearCart: () => set({ cartProducts: [] }),

  // Obtener el total del carrito (suma de los precios * cantidad de cada producto)
  getCartTotal: () =>
    set((state) =>
      state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    ),
    
}));
