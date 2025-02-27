import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon} from "lucide-react";
import {useQuery } from '@tanstack/react-query'
import useManagerUser from "../hooks/useManagerUser";
import { getClient } from "../api/apiClient";
import { useEffect } from "react";
import { useFormClient } from "../hooks/useFormClient";

function ClientPage() { 

    const { id } = useParams();

    const { data: clientData, isLoading } = useQuery({
        queryKey: id ? ['client', id] : null,
        queryFn: () => getClient(id),
        enabled: !!id // Solo ejecuta la consulta si id tiene valor
    });
    
    const {handleChange,handleInputChange,client} = useFormClient()

    const {updateMutation} = useManagerUser()

    const handleSubmit = (e) => {
        e.preventDefault()
        const clientWithId = {
            ...client,
            id
        }
        updateMutation.mutate(clientWithId, {
            onSuccess: () => {
                navigate('/');  // Redireccionar a la página principal después de actualizar
            }
        });
       
    }
    useEffect(() => {
        if(clientData){
            handleChange(clientData)
        }
    }, [clientData])

 
  const navigate = useNavigate();



  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Clients
      </button>
        {
            isLoading ? 
            (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            )
            :
            (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* PRODUCT IMAGE */}
                    

                    {/* PRODUCT FORM */}
                    <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">Edit Product</h2>

                        <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        >
                        {/* PRODUCT NAME */}
                        <div className="form-control space-y-1">
                            <label className="label">
                            <span className="label-text text-base font-medium">Product Name</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered w-full"
                            name="name"
                            value={client.name}
                            onChange={handleInputChange}
                            />
                        </div>


                        <div className="form-control space-y-1">
                            <label className="label">
                            <span className="label-text text-base font-medium">Client Email</span>
                            </label>
                            <input
                            type="email"
                            placeholder="Enter client email"
                            className="input input-bordered w-full"
                            name="email"
                            value={client.email}
                            onChange={handleInputChange}
                            />
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="form-control space-y-1">
                            <label className="label">
                            <span className="label-text text-base font-medium">Client Job</span>
                            </label>
                            <input
                            type="text"
                            placeholder="Enter client Job"
                            className="input input-bordered w-full"
                            name="Job"
                            value={client.Job}
                            onChange={handleInputChange}
                            />
                        </div>

                        {/* PRODUCT IMAGE URL */}
                        <div className="form-control space-y-1">
                            <label className="label">
                            <span className="label-text text-base font-medium">Client Rate</span>
                            </label>
                            <input
                            type="number"
                            placeholder="0"
                            className="input input-bordered w-full"
                            name="Rate"
                            value={client.Rate}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control space-y-1">
                        
                            <label className="label">
                                <span className="label-text text-base font-medium">Status</span>
                            </label>
                            <div className="relative space-x-2">
                                <input type="checkbox" className="toggle toggle-secondary" name='Status' onChange={handleInputChange} checked={client.Status} />
                                <span>Active</span>
                            </div>
                        </div>

                        {/* FORM ACTIONS */}
                        <div className="flex justify-between mt-8">
                        

                            <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!client.name || !client.email || !client.Job || !client.Rate}
                            >
                            
                                <SaveIcon className="size-4 mr-2" />
                                Save Changes
                            
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            )
        }

    </div>
  );
}
export default ClientPage;