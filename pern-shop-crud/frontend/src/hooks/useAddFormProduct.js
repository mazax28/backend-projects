import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createProduct } from '../api/apiProducts';
export const useAddFormProduct = () => {
    const initialProduct = {
        name: '',
        description: '',
        price: '',
        image: ''
    }
    const [product, setProduct] = useState(initialProduct);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(product);
        setProduct(initialProduct);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    return { product, handleChange, handleSubmit};


}