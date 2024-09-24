import { loginRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function MenuAfiliado() {
  const { register, handleSubmit } = useForm();
  const navigation = [
    { name: "Inicio", href: "/menuAfiliado", current: false },
    { name: "Registrar Negocio", href: "/registerCompany", current: true },
    { name: "Editar Negocio", href: "/editCompany", current: false },
  ];


  return (
    <>
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />
      <div><div><h1>MENU AFILIADO</h1></div></div>


    </>
  )
}


