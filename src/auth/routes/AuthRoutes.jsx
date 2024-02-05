import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RecoveryPage, VerifyPage, ChangePassword } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='recovery' element={<RecoveryPage/>}/>
        <Route path='verify' element={<VerifyPage/>}/>
        <Route path='updatePassword/:id' element={<ChangePassword/>}/>

        <Route path='/*' element={<Navigate to='/auth/login'/>}/>
    </Routes>
  )
}

