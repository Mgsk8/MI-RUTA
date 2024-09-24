export const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) || "El correo electrónico no es válido";
};

export const validatePassword = (value) => {
    if (value.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
    }
    return true;
};

export const validateCheckbox = (value) => {
    return value || "Debes aceptar los términos y condiciones";
};
