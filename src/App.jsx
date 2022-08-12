import { HashRouter, Routes, Route } from 'react-router-dom'
import { Login, Home, ProductID, Purschases } from './pages/Index'
import { NavBar, LoadingScreen } from "./components/index"
import { useSelector } from "react-redux"
import "./Style.css"
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Logout from './components/Logout'

function App() {
  const isLoading = useSelector(state => state.isLoading)
  const token = localStorage.getItem("token")
  return (
   <HashRouter>
    {isLoading && <LoadingScreen/>}
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/ProductID/:id" element={<ProductID />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="/register" element={<Register />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purschases />}/>
        </Route>
    </Routes>
   </HashRouter>
  )
}

export default App
