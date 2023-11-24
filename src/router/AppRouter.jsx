import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { InventoriesRoutes } from "../inventories/routes/InventoriesRoutes"

export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path='/auth/*' element={<AuthRoutes/>}/>

        {/* InventoriesApp */}
        <Route path='/*' element={<InventoriesRoutes/>}/>

    </Routes>
  )
}
