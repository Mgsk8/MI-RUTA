import {BrowserRouter,Routes,Route} from "react-router-dom";

import LogIn from "./pages/LoginUsers";
import Inicio from "./pages/Inicio";
import RoleSelection from "./pages/RegisterUsers";
import RegisterClient from "./pages/RegisterClient";
import RegisterAffiliate from "./pages/RegisterAffiliate";
import Madmin from "./pages/Madim";
import MenuAfiliado from "./pages/MenuAfiliado";
import MenuCliente from "./pages/MenuCliente";

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
        <Route path="/menuCliente" element={<MenuCliente />}/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App