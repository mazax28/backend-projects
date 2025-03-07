import {  useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import Logo from "./Logo";
import Cart from "./Cart";
function Navbar() {
  const {pathname} = useResolvedPath()
  const isHome = pathname === "/"
  return (
    <div className="bg-base-100/80 backdrop:blur-lg border-b border-base-content top-0 z-50">
      <div className="max-w-7xl mx-auto"> 
        <div className="navbar px-4 min-h-[4rem] justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <ThemeSelector />
            <Cart isHome={isHome} />
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default Navbar
