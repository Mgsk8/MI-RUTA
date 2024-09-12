import Navbar from "../components/Navbar";

export default function LogIn() {
  const navigation = [
    { name: "Inicio", href: "/", current: false },
    { name: "Iniciar sesión", href: "/login", current: true },
    { name: "Registrarse", href: "/register", current: false },
    { name: "Acerca", href: "#", current: false },
  ];

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar navigation={navigation} logo="/Image/logoblanco.png" />

      
    </div>
  );
}
