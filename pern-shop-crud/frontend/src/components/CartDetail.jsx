import { useCartProducts } from "../store/useCartProducts"

function CartDetail() {
    const {cartProducts} = useCartProducts()
    const total = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="flex mt-4 ">
        <p className="font-semibold">{`Subtotal: $${total}`}</p>
        <button className="btn btn-primary flex-1">Checkout</button>
    </div>
  )
}

export default CartDetail
