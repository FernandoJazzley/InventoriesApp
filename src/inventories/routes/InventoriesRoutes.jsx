import { Navigate, Route, Routes } from "react-router-dom"
import { InventoriesPage, UsersPage } from "../pages"

export const InventoriesRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={ <InventoriesPage/>}/>
        <Route path='/users' element={ <UsersPage/>}/>
        <Route path='/*' element={ <Navigate to='/'/>}/>

    </Routes>
  )
}
