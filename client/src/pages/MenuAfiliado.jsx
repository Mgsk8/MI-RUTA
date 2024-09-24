import { loginRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function MenuAfiliado() {
  const { register, handleSubmit } = useForm();
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: true },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Acerca", href: "#", current: false },
    { name: "administrador", href: "admin", current: true },

  ];

  
  return (
    <>
      <div><div><h1>MENU AFILIADO</h1></div></div>
      
        
    </>
  )
}


