import AddProductModal from "../components/AddProductModal";
import DrawerCart from "../components/DrawerCart";
import ProductListContainer from "../components/ProductListContainer";
import ProductToolbar from "../components/ProductToolbar";

function HomePage() {
  
  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <ProductToolbar />
      <AddProductModal />
      <ProductListContainer/>
      <DrawerCart />


    </main>
  );
}

export default HomePage;
