import {Plus, Minus} from 'lucide-react'
import { useCartProducts } from '../store/useCartProducts';

function CartItem({product}) {
    const {addToCart,removeFromCart} = useCartProducts()

    const handleAddCart = ()=>{
        addToCart(product)
    }
    const handleremove = ()=>{
        removeFromCart(product.id)
    }
  return (
    <div>
                    <img className='max-w-[100px] rounded-sm' src={product.image} alt="Product" />
                    <div className="flex flex-col items-start">
                        <h2 className="">{product.name}</h2>
                        <p className="font-bold">{product.price}</p>
                        <div className="flex  items-center gap-2 p-2 bg-base-100 rounded-lg">
                            <button onClick={handleAddCart} className="btn btn-square btn-primary btn-sm  cursor-pointer">
                                <Plus className="size-3" />
                            </button>
                            <span className='font-semibold text-xl'>{product.quantity}</span>
                            <button onClick={handleremove} className="btn btn-square btn-primary btn-sm cursor-pointer font-bold">
                                <Minus className="size-3" />
                            </button>
                        </div>

                    </div>
     </div>
  )
}

export default CartItem
