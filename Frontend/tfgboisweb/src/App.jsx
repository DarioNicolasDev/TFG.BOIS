import { AuthProvider } from './contexts/AuthContext';
import { withAuth } from './withAuth';
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Sorprendeme from './pages/Sorprendeme/Sorprendeme';
import Receta from './pages/Receta/Receta';
import QuieroCocinar from './pages/QuieroCocinar/QuieroCocinar';
import Perfil from './pages/Perfil/Perfil';
import RecetaDetallePage from './pages/RecetaDetalle/RecetaDetallePage';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import { APIProvider } from './contexts/ApiContext';
import Cocinar from './pages/Cocinar/Cocinar';
import RecetaPasos from './pages/RecetaPasos/RecetaPasos';
import RecetasPage from './pages/Receta/RecetasPage';

const AuthHome = withAuth(Home);
const AuthQuieroCocinar = withAuth(QuieroCocinar);
const AuthPerfil = withAuth(Perfil);
const AuthSorprendeme = withAuth(Sorprendeme);
const AuthReceta = withAuth(Receta);
const AuthRecetaDetalle = withAuth(RecetaDetallePage);
const AuthCocinar = withAuth(Cocinar);
const AuthRecetaPasos = withAuth(RecetaPasos);
const AuthRecetasPage = withAuth(RecetasPage);

function App() {


  return (

    <div>
      <Router>
        <AuthProvider>
          <APIProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<AuthHome />} />
                <Route path="/quieroCocinar" element={<AuthQuieroCocinar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sorprendeme" element={<AuthSorprendeme />} />
                <Route path="/receta" element={<AuthReceta />} />
                <Route path='/RecetaDetalle' element={<AuthRecetaDetalle />} />
                <Route path="/perfil" element={<AuthPerfil />} />
                <Route path="/Cocinar" element={<AuthCocinar />} />
                <Route path="/RecetaPasos" element={<AuthRecetaPasos />} />
                <Route path="/Recetas" element={< AuthRecetasPage />} />

              </Routes>
            </Layout>
          </APIProvider>
        </AuthProvider>
      </Router>

    </div>
  )
}

export default App
