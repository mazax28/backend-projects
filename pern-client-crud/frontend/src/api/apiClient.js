// import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";
import toast from "react-hot-toast";

export const getClients = async () => {
    try {
        // Aqui se trae la data de la API
        const response = await axios.get(`${API_URL}`);
        
        if (!response.data || !response.data.clients) {
            throw new Error("Response does not contain clients' field");
        }
        // Se devuelve solo el array de productos
        return response.data.clients; // Axios almacena los datos en response.data
    } catch (error) {
        toast.error("Error fetching clients");

        console.error("Error fetching clients:", error);
    }
};



export const getClient = async (id) =>{
    try{
       const response = await axios.get(`${API_URL}/${id}`)
       if (response.status === 200) {
        toast.success("Cliente cargado correctamente");
        } else {
            toast.error("Error al cargar el cliente");
        }
        return response.data.client
    }
    catch(error){
        console.error(error)
    }
}

export const createClient = async (client) =>{
    console.log("api create",client)
    
    try{
        const response = await axios.post(API_URL,client)
        if (response.status === 201) {
            toast.success("Cliente creado correctamente");
        } else {
            toast.error("Error al crear el cliente");
        }

    }
    catch(error){
        toast.error("Error al crear el cliente")

        console.error(error)
    }
}

export const updateClient = async (client) =>{
    const {id, ...clientData} = client
    console.log("api update",clientData)
    console.log("api update",id)
    try{
        const response= await axios.put(`${API_URL}/${id}`,clientData)
        if (response.status === 200) {
            toast.success("Cliente editado correctamente");
        } else {
            toast.error("Error al editar el cliente");
        }
    }
    catch(error){
        toast.error("Error updating client")

        console.error(error)

    }
}

export const deleteClient = async (id) =>{
    console.log(`URL :${API_URL}${id}`)

    try{
        const response = await axios.delete(`${API_URL}/${id}`);

    // Verificar que el producto fue eliminado
        if (response.status === 200) {
        toast.success("Cliente eliminado correctamente");
        } else {
        toast.error("Error al eliminar el cliente");
        }
    }
    catch(error){
        toast.error("Error deleting client")
        console.error(error)
    }
}