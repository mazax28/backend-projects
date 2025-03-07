import { Link } from 'react-router-dom'
import { Trash2Icon, EditIcon, ShoppingCart } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../api/apiProducts'
import { useCartProducts } from '../store/useCartProducts'
function ProductCard({ product }) {

    const {addToCart} = useCartProducts()
    const client = true
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['products'] })
        },
      })

    const handleAddToCart = () => {
      console.log(product)
      addToCart(product)
    }
    

    const handleDelete = () => {
        mutation.mutate(product.id)
    }
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <figure className="relative pt-[56.25%]">
            <img src={product.image} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover" />
        </figure>
        <div className="card-body">
            <h2 className="card-title text-lg font-semibold">{product.name}</h2>
            <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
        </div>

        <div className="card-actions justify-end m-4">
          {
            client ? (
              <button onClick={handleAddToCart} className="btn btn-sm btn-primary btn-outline">
                  <ShoppingCart className="size-4" />
              </button>
              

            ) : (
              <>
                <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                  <EditIcon className="size-4" />
                </Link>
                <button className="btn btn-sm btn-error btn-outline">
                  <Trash2Icon className="size-4" />
                </button>
              
              </>
            )
          }
         
        </div>
      
    </div>
  )
}

export default ProductCard
