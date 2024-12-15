document.addEventListener("DOMContentLoaded", function () {
    const contenedorCarrito = document.getElementById("carrito-productos");
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoComprado = document.getElementById("carrito-comprado");
    const totalElement = document.getElementById("Total");

    // Botones nuevos
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const comprarAhoraBtn = document.getElementById("comprar-ahora");
    const carritoAcciones = document.getElementById("carrito-acciones");

    // Recuperar los productos del carrito desde localStorage
    let listaCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoAcciones.style.display = "none"; // Ocultar botones de acción

    // Mostrar los productos en el carrito
    if (listaCarrito.length === 0) {
        carritoVacio.style.display = "block"; // Mostrar el mensaje de carrito vacío
        carritoComprado.style.display = "none"; // Ocultar el mensaje de compra
        carritoAcciones.style.display = "none"; // Ocultar botones de acción
        return;
    } else {
        carritoVacio.style.display = "none"; // Ocultar el mensaje de carrito vacío
        carritoAcciones.style.display = "flex"; // Mostrar los botones de acción
    }

    let total = 0;
    contenedorCarrito.innerHTML = ''; // Limpiar el contenido antes de agregar los productos

    // Agrupar productos similares y actualizar cantidades
    listaCarrito = listaCarrito.reduce((acumulador, producto) => {
        const encontrado = acumulador.find(item => item.titulo === producto.titulo);

        if (encontrado) {
            // Si el producto ya está en el carrito, aumentar la cantidad y subtotal
            encontrado.cantidad += 1;
            encontrado.subtotal = encontrado.precio * encontrado.cantidad;
        } else {
            // Si es un producto nuevo, agregarlo con cantidad 1
            producto.cantidad = 1;
            producto.subtotal = producto.precio;
            acumulador.push(producto);
        }

        return acumulador;
    }, []);

    // Mostrar productos
    listaCarrito.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("carrito-producto");

        productoDiv.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.subtotal}</p>
        </div>
        <!-- Botón de eliminar como texto -->
        <button class="carrito-producto-eliminar" data-index="${index}">Eliminar</button>
        <!-- Botón de comprar -->
        <button class="carrito-producto-comprar">Comprar</button>
    `;

        contenedorCarrito.appendChild(productoDiv);

        // Actualizar el total
        total += producto.subtotal;

        // Eliminar producto del carrito
        const eliminarBtn = productoDiv.querySelector(".carrito-producto-eliminar");
        eliminarBtn.addEventListener("click", function () {
            listaCarrito.splice(index, 1); // Eliminar el producto de la lista
            localStorage.setItem('carrito', JSON.stringify(listaCarrito)); // Actualizar el carrito en localStorage
            location.reload(); // Recargar la página para actualizar el carrito
        });
    });

    totalElement.textContent = `TOTAL: $${total}`; // Mostrar el total del carrito

    // Acción para vaciar el carrito con confirmación
    vaciarCarritoBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            listaCarrito = []; // Vaciar el carrito
            localStorage.setItem('carrito', JSON.stringify(listaCarrito)); // Actualizar el carrito en localStorage
            location.reload(); // Recargar la página para actualizar el carrito
        }
    });

    // Acción para simular la compra con confirmación
    comprarAhoraBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres realizar esta compra?")) {
            alert("¡Gracias por tu compra!"); // Simulación de una compra
            listaCarrito = []; // Vaciar el carrito
            localStorage.setItem('carrito', JSON.stringify(listaCarrito)); // Actualizar el carrito en localStorage
            location.reload(); // Recargar la página para actualizar el carrito
        }
    });

    // Mostrar mensaje de compra cuando se vacía el carrito
    if (listaCarrito.length === 0) {
        carritoComprado.style.display = "none";
        carritoAcciones.style.display = "none"; // Ocultar botones
    }
});
