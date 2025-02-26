import { useEffect, useState } from 'react';
import { useQueryClient, useMutation,useQuery } from '@tanstack/react-query';
import { updateProduct, getProduct } from '../api/apiProducts';
export const useUpdateFormProduct = ({id}) => {
    const initialProduct = {
        name: '',
        description: '',
        price: '',
        image: ''
    }
    const {data, isLoading,error} = useQuery({
        queryKey: ['product',id],
        queryFn: () => getProduct(id),
        cacheTime: 1000 * 60 * 5, // Guarda en caché por 5 minutos
        refetchOnMount: true, // Vuelve a cargar al entrar a la página
        refetchOnWindowFocus: false // No recarga al cambiar de pestaña
    })
    console.log("DATA for update",data)
    const [product, setProduct] = useState(initialProduct);
    useEffect(() => {
        if(data){
            setProduct(data);
        }
    },[data])


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => updateProduct(id,product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(id){
            mutation.mutate({id,...product});

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    return { product, handleChange, handleSubmit};


}