import {BrowserRouter,Routes,Route} from "react-router-dom";

import LoginUsers from './pages/LoginUsers'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App