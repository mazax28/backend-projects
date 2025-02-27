import {CircleUser, Mail, Shovel, HandCoins, PlusCircleIcon} from 'lucide-react'
import {useFormClient} from '../hooks/useFormClient'
import useManagerUser from '../hooks/useManagerUser'

function ModalForm() {
    const {client, handleInputChange} = useFormClient();
    const {createMutation} = useManagerUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation.mutate(client);
        
    }
    console.log(client)
  return (
    <dialog id="add_client_form" className="modal">
        <div className="modal-box">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Add Client</h3>
        
        <form onSubmit={handleSubmit}  className="space-y-6 mt-4">
                <div className="grid gap-6">

                    <div className="form-control space-y-1">
                        <label className="label">
                            <span className="label-text text-base font-medium">Client Name</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <CircleUser className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="Enter  name"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            value={client.name}
                            onChange={handleInputChange}
                            name="name"
                            />
                        </div>
                    </div>


                    <div className="form-control space-y-1">
                        <label className="label">
                            <span className="label-text text-base font-medium">Client email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Mail className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="Enter email"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="email"
                            onChange={handleInputChange}
                            value={client.email}
                            />
                        </div>
                    </div>



                     {/* PRODUCT PRICE INPUT */}
                    <div className="form-control space-y-1">
                        <label className="label">
                            <span className="label-text text-base font-medium">Job</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                                <Shovel className="size-5" />
                            </div>
                            <input
                            type="text"
                            placeholder="Enter job"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="Job"
                            onChange={handleInputChange}
                            value={client.Job}
                            />
                        </div>
                    </div>

                    {/* PRODUCT IMAGE */}
                    <div className="form-control space-y-1">
                        
                        <label className="label">
                            <span className="label-text text-base font-medium">Rate</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                            <HandCoins className="size-5" />
                            </div>
                            <input
                            type="number"
                            placeholder="Enter rate"
                            className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                            name="Rate"
                            onChange={handleInputChange}
                            value={client.Rate}
                            />
                        </div>
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

                {/* MODAL ACTIONS */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                        <button
                        type="submit"
                        className="btn btn-primary min-w-[120px]"
                        disabled={!client.name || !client.email || !client.Job || !client.Rate}
                    
                         >
                
                            <PlusCircleIcon className="size-5 mr-2" />
                            Add Client
                        
                        </button>

                    </div>

                </div>  
        </form>
        </div>
  </dialog>
  )
}

export default ModalForm
