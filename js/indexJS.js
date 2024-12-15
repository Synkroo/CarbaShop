// Obtener referencias a los elementos del formulario
const nombre = document.getElementById("nombre");
const password = document.getElementById("password");
const errorNombre = document.getElementById("error-nombre");
const errorPassword = document.getElementById("error-password");
const submitButton = document.getElementById("submit");
const limpiarButton = document.getElementById("limpiar");

errorNombre.style.color = "red";
errorPassword.style.color = "red";

// Validar nombre
function validarNombre() {
  const valor = nombre.value.trim();

  if (valor === "") {
    errorNombre.textContent = "Nombre obligatorio";
    errorNombre.style.display = "block";
    return false;
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(valor)) {
    errorNombre.textContent = "Nombre inválido. Solo se permiten letras y espacios.";
    errorNombre.style.display = "block";
    return false;
  }

  if (valor.length < 3 || valor.length > 20) {
    errorNombre.textContent = "El nombre debe tener entre 3 y 20 caracteres.";
    errorNombre.style.display = "block";
    return false;
  }

  errorNombre.style.display = "none";
  return true;
}

// Validar contraseña
function validarPassword() {
  const valor = password.value.trim();

  if (valor === "") {
    errorPassword.textContent = "La contraseña es obligatoria.";
    errorPassword.style.display = "block";
    return false;
  }

  if (!/^[a-zA-Z0-9·$%&/()]{8,16}$/.test(valor)) {
    errorPassword.textContent =
      "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
    errorPassword.style.display = "block";
    return false;
  }

  errorPassword.style.display = "none";
  return true;
}

// Validar formulario completo
function validarFormulario(event) {
  event.preventDefault(); 
  const nombreValido = validarNombre();
  const passwordValido = validarPassword();

  if (!nombreValido || !passwordValido) {
    event.preventDefault(); 
    return false;
  }
    window.location.href = "main.html"; 
  return true;
}

// Limpiar datos del formulario
function limpiarDatos() {
  nombre.value = "";
  password.value = "";
  errorNombre.style.display = "none";
  errorPassword.style.display = "none";
}

// Eventos
nombre.addEventListener("blur", validarNombre);
password.addEventListener("blur", validarPassword);
submitButton.addEventListener("click", validarFormulario);
limpiarButton.addEventListener("click", limpiarDatos);
