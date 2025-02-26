import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../api/apiProducts'
import { useUpdateFormProduct } from "../hooks/useUpdateFormProduct";

function ProductPage() { 

  const { id } = useParams();
  console.log("ID",id)
 
  const { product, handleChange, handleSubmit } = useUpdateFormProduct({id:id});
 
  
  const navigate = useNavigate();


  const queryClient = useQueryClient()
  const mutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['products'] })
      },
    })

 


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        mutation.mutate(id)
        navigate("/");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={product?.image}
            alt={product?.name}
            className="size-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Product Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Product Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Price</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!product.name || !product.price || !product.image || !product.description}
                >
                 
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;