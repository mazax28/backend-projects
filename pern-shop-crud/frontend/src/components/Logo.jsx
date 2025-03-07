import {Link} from "react-router-dom"
import { ShoppingCartIcon } from "lucide-react";
function Logo() {
  return (
    <div className="flex-1 lg:flex-none">
    <Link to="/" className="hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-2">
        <ShoppingCartIcon className="size-9 text-primary" />
        <span
          className="font-semibold font-mono tracking-widest text-2xl 
            bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          POSGRESTORE
        </span>
      </div>
    </Link>
</div>
  )
}

export default Logo
