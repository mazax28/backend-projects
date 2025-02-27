import { Toaster } from "react-hot-toast"
import ModalForm from "./components/ModalForm"
import Navbar from "./components/Navbar"
import TableList from "./components/TableList"
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ClientPage from "./pages/ClientPage"


function App() {

  return (
    <>

    <Navbar />
    <ModalForm />
    <Toaster />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/client/:id" element={<ClientPage />} />
    </Routes>

    </>
  )
}

export default App
