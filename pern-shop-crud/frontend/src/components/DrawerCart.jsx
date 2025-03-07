import {Plus, Minus} from 'lucide-react'
import { useCartProducts } from '../store/useCartProducts';
import CartItem from './CartItem';
import CartDetail from './CartDetail';
function DrawerCart({ isOpen, toggleDrawer }) {

    const {cartProducts} = useCartProducts()
    console.log(cartProducts)
    return (
      <div className="drawer drawer-end z-50">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen} // Controlamos si el drawer está abierto
          onChange={toggleDrawer} // Controlamos el cambio de estado
        />
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content */}
            <li className="text-2xl font-bold mb-4 text-center">Your Cart</li>
            {
                cartProducts?.map(product => (
                    <li key={product.id}>
                        <CartItem product={product} />
                    </li>
                ))
            }
            <li>
                <CartDetail />
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default DrawerCart;
  