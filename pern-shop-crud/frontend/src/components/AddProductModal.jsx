import { useAddFormProduct } from "../hooks/useAddFormProduct"
import { Package2Icon, DollarSignIcon, PlusCircleIcon, ImageIcon} from "lucide-react"
function AddProductModal() {
    const { product, handleChange, handleSubmit } = useAddFormProduct();
  return (
    <dialog  id="add_product_modal" className="modal">
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
            </form>
            <h3 className="font-bold text-xl mb-8">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Product Name</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Package2Icon className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Product Description</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Package2Icon className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="Enter product description"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            />
                        </div>
                    </div>



                     {/* PRODUCT PRICE INPUT */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Price</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <DollarSignIcon className="size-5" />
                            </div>
                            <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* PRODUCT IMAGE */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-base font-medium">Image URL</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                            <ImageIcon className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            value={product.image}
                            name="image"
                            onChange={handleChange}
                            />
                        </div>
                    </div>

                {/* MODAL ACTIONS */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                        <button
                        type="submit"
                        className="btn btn-primary min-w-[120px]"
                        disabled={!product.name || !product.price || !product.image}
                        >
                
                            <PlusCircleIcon className="size-5 mr-2" />
                            Add Product
                        
                        </button>

                    </div>

                </div>  
            </form>

        </div>


    </dialog>
  )
}

export default AddProductModal
