import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import{useQueryClient} from "@tanstack/react-query"
import { useProductPagination } from "../store/useProductPagination";

function ProductToolbar() {
    const queryClient = useQueryClient();
    const {searchTerm,setSearchTerm} = useProductPagination()
    const hanleChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
      }

    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
  return (
    
    <div className="flex justify-between items-center mb-8">
        
        <button className="btn btn-primary "  onClick={() => document.getElementById("add_product_modal").showModal()}> 
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <input value={searchTerm} onChange={hanleChange} type="text" placeholder="Type here" className="input" />


        <button onClick={handleRefresh} className="btn btn-ghost btn-circle">
          <RefreshCwIcon className="size-5" />
        </button>
      </div>
  )
}

export default ProductToolbar
