import { jsPDF } from "jspdf";
import { saveAs } from "file-saver"; // Para descargar el archivo en el navegador

// Función para generar un código único y largo basado en el resultado
const generarCodigoEncriptado = (mensaje) => {
  return btoa(mensaje + Date.now()).slice(0, 32); // Genera un código base64 truncado
};

// Función para crear el PDF de la tarjeta de regalo
export const generarPDFTarjeta = async (mensaje) => {
  try {
    const doc = new jsPDF();

    // Fondo de la tarjeta con un degradado de colores
    doc.setFillColor(255, 223, 186); // Color suave de fondo (beige claro)
    doc.rect(0, 0, 210, 297, 'F'); // Rectángulo de fondo (A4 tamaño)

    // Sombra alrededor de la tarjeta para darle un toque 3D
    doc.setFillColor(200, 200, 200);
    doc.rect(5, 5, 200, 287, 'F'); // Sombra

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 136, 181); // Azul oscuro
    doc.text("¡Tarjeta de Regalo!", 50, 50);

    // Estilo de la caja del mensaje
    doc.setFillColor(255, 255, 255); // Fondo blanco para el mensaje
    doc.setDrawColor(0, 136, 181); // Color de borde azul
    doc.rect(20, 70, 170, 50, 'FD'); // Caja para el mensaje (con relleno)
    doc.setTextColor(0, 0, 0); // Texto en negro
    doc.setFontSize(16);
    doc.text(`Premio: ${mensaje}`, 30, 95);

    // Caja para el código
    doc.setFillColor(255, 255, 255); // Fondo blanco para el código
    doc.setDrawColor(153, 26, 26); // Borde rojo oscuro
    doc.rect(20, 150, 170, 40, 'FD'); // Caja para el código
    doc.setTextColor(153, 26, 26); // Texto rojo oscuro
    doc.setFontSize(14);
    doc.text(`Código: ${generarCodigoEncriptado(mensaje)}`, 30, 175);

    // Agregar una línea decorativa
    doc.setLineWidth(1);
    doc.setDrawColor(0, 136, 181); // Azul
    doc.line(20, 135, 190, 135); // Línea decorativa antes del código

    // Incluir una imagen opcional de fondo (si tienes una imagen de tarjeta, puedes usarla aquí)
    // doc.addImage('url_imagen', 'JPEG', 20, 50, 170, 100);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Gris para el pie de página
    doc.text("Gracias por ser parte de nuestra comunidad. ¡Disfruta tu premio!", 20, 280);

    // Guardar el archivo PDF
    doc.save('tarjeta_de_regalo.pdf');

    console.log("PDF generado exitosamente.");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};

export default generarCodigoEncriptado;
