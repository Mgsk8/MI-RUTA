export const AUTH_TYPES = {
    TRUE: true,
    FALSE: false
}

export const LOCAL_STORAGE_TERMS = {
    ID_LOGGED_USER: "id_usuario_actual",
    LOGGED_AUTH: "logged_auth"
}

export const ID_CURRENT_USER = localStorage.getItem(LOCAL_STORAGE_TERMS.ID_LOGGED_USER);