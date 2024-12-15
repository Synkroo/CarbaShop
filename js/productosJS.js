document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        { "titulo": "Movil 01", "imagen": "./img/moviles/01.jpg", "precio": 850, "categoria": "moviles" },
        { "titulo": "Movil 02", "imagen": "./img/moviles/02.jpg", "precio": 909, "categoria": "moviles" },
        { "titulo": "Movil 03", "imagen": "./img/moviles/03.jpg", "precio": 1249, "categoria": "moviles" },
        { "titulo": "Movil 04", "imagen": "./img/moviles/04.jpg", "precio": 349, "categoria": "moviles" },
        { "titulo": "Movil 05", "imagen": "./img/moviles/05.jpg", "precio": 450, "categoria": "moviles" },
        { "titulo": "Portatil 01", "imagen": "./img/portatiles/01.jpg", "precio": 1250, "categoria": "portatiles" },
        { "titulo": "Portatil 02", "imagen": "./img/portatiles/02.jpg", "precio": 1100, "categoria": "portatiles" },
        { "titulo": "Portatil 03", "imagen": "./img/portatiles/03.jpg", "precio": 650, "categoria": "portatiles" },
        { "titulo": "Portatil 04", "imagen": "./img/portatiles/04.jpg", "precio": 450, "categoria": "portatiles" },
        { "titulo": "Portatil 05", "imagen": "./img/portatiles/05.jpg", "precio": 909, "categoria": "portatiles" },
        { "titulo": "Portatil 06", "imagen": "./img/portatiles/06.jpg", "precio": 899, "categoria": "portatiles" },
        { "titulo": "Portatil 07", "imagen": "./img/portatiles/07.jpg", "precio": 700, "categoria": "portatiles" },
        { "titulo": "Portatil 08", "imagen": "./img/portatiles/08.jpg", "precio": 400, "categoria": "portatiles" },
        { "titulo": "Televisiones 01", "imagen": "./img/televisiones/01.jpg", "precio": 500, "categoria": "televisiones" },
        { "titulo": "Televisiones 02", "imagen": "./img/televisiones/02.jpg", "precio": 1000, "categoria": "televisiones" },
        { "titulo": "Televisiones 03", "imagen": "./img/televisiones/03.jpg", "precio": 700, "categoria": "televisiones" },
        { "titulo": "Televisiones 04", "imagen": "./img/televisiones/04.jpg", "precio": 550, "categoria": "televisiones" },
        { "titulo": "Televisiones 05", "imagen": "./img/televisiones/05.jpg", "precio": 1200, "categoria": "televisiones" }
    ];
 
    const contenedorProductos = document.getElementById("contenedor-productos");
    const numerito = document.getElementById("numerito"); // Elemento que muestra el número del carrito
    let listaCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    numerito.textContent = listaCarrito.length;

    function mostrarProductos(categoria = "todos") {
        const contenedorProductos = document.getElementById("contenedor-productos");
        contenedorProductos.innerHTML = ""; // Limpiar el contenedor

        const productosFiltrados = categoria === "todos"
            ? productos
            : productos.filter(producto => producto.categoria === categoria);

        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            productoDiv.innerHTML = `
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar">Agregar</button>
                </div>
                <img class="producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
            `;

            // Agregar el producto al carrito cuando se haga clic en "Agregar"
            const botonAgregar = productoDiv.querySelector(".producto-agregar");
            botonAgregar.addEventListener("click", () => {
                listaCarrito.push(producto); // Agregar el producto al carrito
                localStorage.setItem('carrito', JSON.stringify(listaCarrito)); // Guardar el carrito en localStorage
                numerito.textContent = listaCarrito.length; // Actualizar el númer
            });

            contenedorProductos.appendChild(productoDiv);
        });
    }

    // Inicializar con todos los productos
    mostrarProductos();

    // Manejar los clics en los botones de categoría
    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', function() {
            // Eliminar la clase 'active' de todos los botones
            botonesCategorias.forEach(btn => btn.classList.remove('active'));

            // Agregar la clase 'active' al botón clickeado
            boton.classList.add('active');

            // Filtrar los productos según la categoría
            const categoria = boton.id;
            mostrarProductos(categoria);
        });
    });
});
