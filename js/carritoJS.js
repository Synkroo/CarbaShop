document.addEventListener("DOMContentLoaded", function () {
    const contenedorCarrito = document.getElementById("carrito-productos");
    const carritoVacio = document.getElementById("carrito-vacio");
    const carritoComprado = document.getElementById("carrito-comprado");
    const totalElement = document.getElementById("Total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const comprarAhoraBtn = document.getElementById("comprar-ahora");
    const carritoAcciones = document.getElementById("carrito-acciones");

    let listaCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoAcciones.style.display = "none";

    if (listaCarrito.length === 0) {
        carritoVacio.style.display = "block";
        carritoComprado.style.display = "none";
        carritoAcciones.style.display = "none";
        return;
    } else {
        carritoVacio.style.display = "none";
        carritoAcciones.style.display = "flex";
    }

    let total = 0;
    contenedorCarrito.innerHTML = '';

    listaCarrito = listaCarrito.reduce((acumulador, producto) => {
        const encontrado = acumulador.find(item => item.titulo === producto.titulo);

        if (encontrado) {
            encontrado.cantidad += 1;
            encontrado.subtotal = encontrado.precio * encontrado.cantidad;
        } else {
            producto.cantidad = 1;
            producto.subtotal = producto.precio;
            acumulador.push(producto);
        }

        return acumulador;
    }, []);

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
        <button class="carrito-producto-eliminar" data-index="${index}">Eliminar</button>
        <button class="carrito-producto-comprar">Comprar</button>
    `;

        contenedorCarrito.appendChild(productoDiv);

        total += producto.subtotal;

        const eliminarBtn = productoDiv.querySelector(".carrito-producto-eliminar");
        eliminarBtn.addEventListener("click", function () {
            listaCarrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(listaCarrito));
            location.reload();
        });
    });

    totalElement.textContent = `TOTAL: $${total}`;

    vaciarCarritoBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            listaCarrito = [];
            localStorage.setItem('carrito', JSON.stringify(listaCarrito));
            location.reload();
        }
    });

    comprarAhoraBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres realizar esta compra?")) {
            alert("¡Gracias por tu compra!");
            listaCarrito = [];
            localStorage.setItem('carrito', JSON.stringify(listaCarrito));
            location.reload();
        }
    });

    if (listaCarrito.length === 0) {
        carritoComprado.style.display = "none";
        carritoAcciones.style.display = "none";
    }
});
