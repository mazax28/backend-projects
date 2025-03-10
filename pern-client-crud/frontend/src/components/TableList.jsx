import {useQuery} from '@tanstack/react-query'
import { getClients } from "../api/apiClient"
import useManagerUser from '../hooks/useManagerUser'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useClientPaginationStore } from '../store/useClientPaginationStore'
function TableList() {
    const {page , limit,nextPage, prevPage,searchTerm} = useClientPaginationStore()
    const {data: clients, isLoading} = useQuery({
        queryKey: ['clients', {page,limit}],
        queryFn: () => getClients({page,limit})
    })
    const {updateMutation,deleteMutation} = useManagerUser()
    const handleChangeStatus = (id, name,email,Job, Rate, Status ) => {
        const clientUpdate = {
            id,
            name,
            email,
            Job,
            Rate,
            Status: !Status
        }
        console.log("Client update:", clientUpdate)
        updateMutation.mutate(clientUpdate)
    }

    const handleDelete = (id) => {
        deleteMutation.mutate(id)
    }
    const filteredClients = useMemo(() => {
        if (!clients) return [];
        
        const sorted = [...clients].sort((a, b) => a.id - b.id);
        
        if (!searchTerm.trim()) return sorted;
        
        return sorted.filter(client => {
            const searchLower = searchTerm.toLowerCase();
            return (
                client.name.toLowerCase().includes(searchLower) ||
                client.email.toLowerCase().includes(searchLower) ||
                client.Job.toLowerCase().includes(searchLower) ||
                String(client.Rate).includes(searchTerm)
            );
        });
    }, [clients, searchTerm]);


    // className="hover:bg-base-300"
  return (
    <div className="overflow-x-auto mt-4">

        {
            isLoading ?
            (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            )
            :
            (
                <>
                    <table className="table xs:table-xs sm:table-sm" >
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody >
                            {
                                filteredClients.map((client)=>(
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.Job}</td>
                                        <td>{client.Rate}</td>
                                        <td >
                                            <button onClick={()=>handleChangeStatus(client.id,client.name, client.email, client.Job,client.Rate,client.Status)} className="btn btn-outline w-full btn-info xs:btn-xs sm:btn-sm  md:btn-md">
                                                {
                                                    client.Status ? 'Active' : 'Inactive'
                                                }
                                            </button>
                                        </td>
                                        <td className="flex gap-2">
                                            
                                            <Link className='w-1/2' to={`/client/${client.id}`}>
                                            <button className="btn btn-accent btn-outline w-full xs:btn-xs sm:btn-sm  md:btn-md">Update</button>
                                            </Link>
                                            <button onClick={()=>handleDelete(client.id)} className="btn btn-error btn-outline flex-1/2 xs:btn-xs sm:btn-sm md:btn-md">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='p-4 flex justify-center items-center'>
                        <div className="max-w-[300px] join grid grid-cols-2 gap-2">
                            <button onClick={prevPage} className="join-item btn btn-outline">Previous page</button>
                            <button onClick={nextPage} className="join-item btn btn-outline">Next</button>
                        </div>
                    </div>
                </>

            )
        }


    </div>
  )
}

export default TableList
