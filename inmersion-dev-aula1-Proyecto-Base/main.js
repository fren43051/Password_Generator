let historialContrasenas = [];

document.getElementById("generar").addEventListener("click", generarContrasena);
document.getElementById("limpiar").addEventListener("click", limpiarContrasena);
document.getElementById("historial").addEventListener("click", mostrarHistorial);
document.getElementById("limpiarHistorial").addEventListener("click", limpiarHistorial);
document.getElementById("cerrarPanel").addEventListener("click", cerrarPanel);

document.getElementById("cantidad").setAttribute("min", "8");
document.getElementById("cantidad").setAttribute("max", "30");

function generarContrasena() {
    const cantidad = document.getElementById("cantidad").value;
    const mensajeFortaleza = document.getElementById("mensajeFortaleza");

    if (cantidad < 8) {
        mensajeFortaleza.textContent = "No se permiten menos de 8 caracteres";
        mensajeFortaleza.style.color = "red";
        return;
    }

    if (cantidad > 30) {
        mensajeFortaleza.textContent = "No se permiten más de 30 caracteres";
        mensajeFortaleza.style.color = "red";
        return;
    }

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let contrasena = "";

    for (let i = 0; i < cantidad; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[randomIndex];
    }

    document.getElementById("contrasena").value = contrasena;
    historialContrasenas.push(contrasena);
    validarFortalezaContrasena(contrasena);
}

function limpiarContrasena() {
    document.getElementById("contrasena").value = "";
    document.getElementById("mensajeFortaleza").textContent = "";
}

function mostrarHistorial() {
    document.getElementById("panelHistorial").style.display = "flex";
    document.getElementById("historial").style.display = "none";
    document.getElementById("limpiar").style.display = "none";
    actualizarListadoHistorial();
}

function cerrarPanel() {
    document.getElementById("panelHistorial").style.display = "none";
    document.getElementById("historial").style.display = "inline";
    document.getElementById("limpiar").style.display = "inline";
}

function limpiarHistorial() {
    historialContrasenas = [];
    actualizarListadoHistorial();
}

function actualizarListadoHistorial() {
    const listadoHistorial = document.getElementById("listadoHistorial");
    listadoHistorial.innerHTML = "";

    const contrasenasAMostrar = historialContrasenas.slice(0, 6);

    contrasenasAMostrar.forEach(contrasena => {
        const li = document.createElement("li");
        li.textContent = contrasena;

        const botonCopiar = document.createElement("button");
        botonCopiar.textContent = "Copiar";
        botonCopiar.onclick = () => copiarAlPortapapeles(contrasena);

        li.appendChild(botonCopiar);
        listadoHistorial.appendChild(li);
    });
}

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Contraseña copiada al portapapeles");
    });
}

function validarFortalezaContrasena(contrasena) {
    const mensajeFortaleza = document.getElementById("mensajeFortaleza");
    const regexMayusculas = /[A-Z]/;
    const regexMinusculas = /[a-z]/;
    const regexNumeros = /[0-9]/;
    const regexSimbolos = /[!@#$%^&*()]/;

    if (contrasena.length < 8) {
        mensajeFortaleza.textContent = "No se permiten menos de 8 caracteres";
        mensajeFortaleza.style.color = "red";
    } else if (contrasena.length > 30) {
        mensajeFortaleza.textContent = "No se permiten más de 30 caracteres";
        mensajeFortaleza.style.color = "red";
    } else if (!regexMayusculas.test(contrasena) ||
               !regexMinusculas.test(contrasena) ||
               !regexNumeros.test(contrasena) ||
               !regexSimbolos.test(contrasena)) {
        mensajeFortaleza.textContent = "Contraseña débil";
        mensajeFortaleza.style.color = "red";
    } else {
        mensajeFortaleza.textContent = "Contraseña fuerte";
        mensajeFortaleza.style.color = "green";
    }
}








