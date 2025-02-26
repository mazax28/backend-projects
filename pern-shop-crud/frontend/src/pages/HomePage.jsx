import { useQuery, useQueryClient  } from "@tanstack/react-query";
import { getProducts } from "../api/apiProducts";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary "  onClick={() => document.getElementById("add_product_modal").showModal()}> 
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button onClick={handleRefresh} className="btn btn-ghost btn-circle">
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
      <AddProductModal />
      {error && <div>Error: {error}</div>}

      {
        isLoading ? 
        (
          <div className="flex justify-center items-center h-64">
              <div className="loading loading-spinner loading-lg"></div>
          </div>
        )
        :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }

          </div>
        )
      }
      <div>

      </div>

    </main>
  );
}

export default HomePage;
