// validation.js
export const isAlphanumeric = (value) => {
    // Verifica si el valor contiene solo letras y números
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    return alphanumericRegex.test(value);
  };
  
  export const isExactLength = (value, length) => {
    // Verifica si el valor tiene exactamente la longitud especificada
    return value.length === length;
  };
  
  export const validateToken = (token) => {
    // Verifica si el token tiene 6 caracteres alfanuméricos
    return isAlphanumeric(token) && isExactLength(token, 6);
  };
  