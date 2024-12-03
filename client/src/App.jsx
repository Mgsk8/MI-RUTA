import {BrowserRouter,Routes,Route} from "react-router-dom";
import MenuAfiliado from "./pages/MenuAfiliado";
import LogIn from "./pages/LoginUsers";
import Inicio from "./pages/Inicio";
import RoleSelection from "./pages/RegisterUsers";
import RegisterClient from "./pages/RegisterClient";
import RegisterAffiliate from "./pages/RegisterAffiliate";
import Madmin from "./pages/Madim";
import MenuCliente from "./pages/MenuCliente";
import RegisterCompany from "./pages/RegisterCompany";
import RegisterCompany_admin from "./pages/RegisterCompany_admin";
import Madmin_negocios from "./pages/Madmin_negocios";
import Terms from "./pages/Terms";
import EditarNegocio from "./pages/Editar_negocio";
import InfoNegocio from "./pages/Info_negocio";
import Contact from "./pages/Contact";


function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<LogIn />}/>
        <Route path="/register" element={<RoleSelection />}/>
        <Route path="/registerClient" element={<RegisterClient />}/>
        <Route path="/registerAffiliate" element={<RegisterAffiliate />}/>
        <Route path="/menuAdmin" element={<Madmin />}/>        
        <Route path="/menuAfiliado" element={<MenuAfiliado />}/>
        <Route path="/registerCompany" element={<RegisterCompany />}/>
        <Route path="/registerCompany_admin" element={<RegisterCompany_admin />}/>
        <Route path="/menuCliente" element={<MenuCliente />}/>
        <Route path="/menuAdmin_negocios" element={<Madmin_negocios />}/>
        <Route path="/terms" element={<Terms />}/>
        <Route path="/editarNegocio/:id_lugar" element={<EditarNegocio />}/>
        <Route path="/infoNegocio/:id" element={<InfoNegocio />}/>
        <Route path="/contact/" element={<Contact />}/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App