import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../api/apiProducts";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import {useProductPagination} from "../store/useProductPagination"
import { useMemo } from "react";
function ProductListContainer() {
    const {page,limit,searchTerm} = useProductPagination()
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["products",{page,limit}],
        queryFn:() =>  getProducts({page,limit}),
      });

       const filteredProducts = useMemo(() => {
              if (!products) return [];
              
              const sorted = [...products].sort((a, b) => a.id - b.id);
              
              if (!searchTerm.trim()) return sorted;
              
              return sorted.filter(product => {
                  const searchLower = searchTerm.toLowerCase();
                  return (
                      product.name.toLowerCase().includes(searchLower)
                  );
              });
          }, [products, searchTerm]);
  return (
    <>
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
            <>
                <ProductList products={filteredProducts} />
                <Pagination />
            </>
            )
        }
    </>
  )
}

export default ProductListContainer
