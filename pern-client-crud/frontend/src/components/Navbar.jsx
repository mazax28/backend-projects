import { useClientPaginationStore } from "../store/useClientPaginationStore"
function Navbar() {
  const {searchTerm, setSearchTerm} = useClientPaginationStore()
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    
    <a className="btn btn-ghost text-xl">Clients</a>
  </div>
  <div className="navbar-center">
    <input value={searchTerm} onChange={handleSearch} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

  </div>
  <div className="navbar-end">
    <a className="btn btn-primary"  onClick={()=>document.getElementById('add_client_form').showModal()} >Add Client</a>
  </div>
</div>
  )
}

export default Navbar
