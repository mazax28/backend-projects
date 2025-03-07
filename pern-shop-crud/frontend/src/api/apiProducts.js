// import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";
import toast from "react-hot-toast";

export const getProducts = async ({limit, page}) => {
    try {
        // Aqui se trae la data de la API

    if (page && limit) {
        let skip = (page - 1) * limit;
        const response = await axios.get(`${API_URL}?skip=${skip}&take=${limit}`);
        if (!response.data || !response.data.products) {
            throw new Error("Response does not contain 'products' field");
        }
        return response.data.products
    }
        const response = await axios.get(`${API_URL}`);
        
        if (!response.data || !response.data.products) {
            throw new Error("Response does not contain 'products' field");
        }
        // Se devuelve solo el array de productos
        return response.data.products; // Axios almacena los datos en response.data
    } catch (error) {
        toast.error("Error fetching product")

        console.error("Error fetching products:", error);
    }
};



export const getProduct = async (id) =>{
    console.log(`DIRECIION :http://localhost:3000/products/${id}`)
    try{
       const response = await axios.get(`${API_URL}${id}`)
       if (response.status === 200) {
        toast.success("Producto cargado correctamente");
        } else {
            toast.error("Error al cargar el producto");
        }
        return response.data
    }
    catch(error){
        console.error(error)
    }
}

export const createProduct = async (product) =>{
    const formattedProduct = {
        ...product,
        price: parseFloat(product.price) // Asegurar que price sea un número
    };
    try{
        const response = await axios.post(API_URL,formattedProduct)
        if (response.status === 200) {
            toast.success("Producto creado correctamente");
        } else {
            toast.error("Error al crear el producto");
        }

    }
    catch(error){
        toast.error("Error creating product")

        console.error(error)
    }
}

export const updateProduct = async (id,product) =>{
    console.log(product)
    try{
        const response= await axios.put(`${API_URL}${id}`,product)
        if (response.status === 200) {
            toast.success("Producto editado correctamente");
        } else {
            toast.error("Error al editar el producto");
        }
    }
    catch(error){
        toast.error("Error updating product")

        console.error(error)

    }
}

export const deleteProduct = async (id) =>{
    console.log("api delete",id)
    console.log("api delete",)

    try{
        const response = await axios.delete(`${API_URL}${id}`);

    // Verificar que el producto fue eliminado
        if (response.status === 200) {
        toast.success("Producto eliminado correctamente");
        } else {
        toast.error("Error al eliminar el producto");
        }
    }
    catch(error){
        toast.error("Error deleting product")
        console.error(error)
    }
}