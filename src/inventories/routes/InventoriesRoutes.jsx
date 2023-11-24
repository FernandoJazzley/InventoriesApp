import { Navigate, Route, Routes } from "react-router-dom"
import { InventoriesPage } from "../pages"

export const InventoriesRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={ <InventoriesPage/>}/>
        <Route path='/*' element={ <Navigate to='/'/>}/>

    </Routes>
  )
}
