import { useState } from "react";
import { ShoppingBagIcon } from 'lucide-react';
import DrawerCart from "./DrawerCart"; // Importamos el componente DrawerCart
import { useCartProducts } from "../store/useCartProducts";

function Cart({ isHome }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar el Drawer
  const {cartProducts} = useCartProducts()
  const totalQuantity = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState); // Alternar el estado del Drawer
  };

  return (
    <>
      {isHome && (
        <div onClick={toggleDrawer} className="indicator cursor-pointer drawer-button">
          <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
            <ShoppingBagIcon className="size-5" />
            <span className="badge badge-sm badge-primary indicator-item">
              {totalQuantity}
            </span>
          </div>
        </div>
      )}
      <DrawerCart isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} /> {/* Pasamos el estado y la función */}
    </>
  );
}

export default Cart;
