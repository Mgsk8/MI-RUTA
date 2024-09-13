import {BrowserRouter,Routes,Route} from "react-router-dom";

import LogIn from "./pages/LoginUsers";
import Inicio from "./pages/inicio";
import RoleSelection from "./pages/RegisterUsers";
import RegisterClient from "./pages/RegisterClient";
import RegisterAffiliate from "./pages/RegisterAffiliate";

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
      </Routes>
    </BrowserRouter>  
  )
}

export default App