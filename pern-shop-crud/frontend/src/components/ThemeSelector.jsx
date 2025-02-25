import {PalletIcon} from 'lucide-react'
function ThemeSelector() {
  return (
    <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-circle">
            <PalletIcon className="size-5"/>
        </button>
        <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop:blur-lg rouded-2xl w-56 border border-base-content/10'>

        </div>
      
    </div>
  )
}

export default ThemeSelector
