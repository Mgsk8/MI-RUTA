import { loginRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function MenuCliente() {
  const { register, handleSubmit } = useForm();
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: true },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Acerca", href: "#", current: false },
    { name: "administrador", href: "admin", current: false },

  ];


  
  return (
    <>
      <div><div><h1>MENU CLIENTE</h1></div></div>
      
    </>
  )
}

