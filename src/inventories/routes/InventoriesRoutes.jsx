import { Navigate, Route, Routes } from "react-router-dom"
import { InventoriesPage, UsersPage } from "../pages"
import { ClientsPage } from "../pages/ClientsPage"
import { OrdersPage } from "../pages/OrdersPage"
import { SuppliersPage } from "../pages/SuppliersPage"
import { ProductPage } from "../pages/ProductPage"
import { ReportsPage } from "../pages/ReportsPage"

export const InventoriesRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={ <InventoriesPage/>}/>
        <Route path='/usuarios' element={ <UsersPage/>}/>
        <Route path='/clientes' element={ <ClientsPage/>}/>
        <Route path='/pedidos' element={ <OrdersPage/>}/>
        <Route path='/proveedores' element={ <SuppliersPage/>}/>
        <Route path='/productos' element={ <ProductPage/>}/>
        <Route path='/reportes' element={ <ReportsPage/>}/>

        <Route path='/*' element={ <Navigate to='/'/>}/>

    </Routes>
  )
}
