import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home";
import Denuncia from "./pages/Denuncia";
import Capturar from "./pages/Capturar";
import Login from "./pages/Login";
import Comentarios from "./pages/Comentarios";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comentarios" element={<Comentarios />} />
        <Route path="/denuncia" element={
          <ProtectedRoute>
            <Denuncia />
          </ProtectedRoute>
        } />
        <Route path="/capturar/:idDenuncia" element={
            <ProtectedRoute>
              <Capturar />
            </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
