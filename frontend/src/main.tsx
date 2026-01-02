
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './components/login.tsx'
import RegisterPage from './components/regiser.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>

)
