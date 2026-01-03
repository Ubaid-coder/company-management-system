
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/login.tsx'
import RegisterPage from './components/regiser.tsx'
import { Loggeded } from './auth/loggeded.tsx'
import { RequireAuth } from './auth/RequireAuth.tsx'
import Navbar from './components/navbar.tsx'
import  User  from './components/user.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navbar />
    <Routes >

      <Route element={<RequireAuth />}>
        <Route path='/' element={<App />} />
        <Route path='/user/:id' element={<User />} />
      </Route>

      <Route element={<Loggeded />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

    </Routes>
  </BrowserRouter>

)
