document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        { "titulo": "Movil 01", "imagen": "./img/moviles/01.jpg", "precio": 850 },
        { "titulo": "Movil 02", "imagen": "./img/moviles/02.jpg", "precio": 909 },
        { "titulo": "Movil 03", "imagen": "./img/moviles/03.jpg", "precio": 1249 },
        { "titulo": "Movil 04", "imagen": "./img/moviles/04.jpg", "precio": 349 },
        { "titulo": "Movil 05", "imagen": "./img/moviles/05.jpg", "precio": 450 },
        { "titulo": "Portatil 01", "imagen": "./img/portatiles/01.jpg", "precio": 1250 },
        { "titulo": "Portatil 02", "imagen": "./img/portatiles/02.jpg", "precio": 1100 },
        { "titulo": "Portatil 03", "imagen": "./img/portatiles/03.jpg", "precio": 650 },
        { "titulo": "Portatil 04", "imagen": "./img/portatiles/04.jpg", "precio": 450 },
        { "titulo": "Portatil 05", "imagen": "./img/portatiles/05.jpg", "precio": 909 },
        { "titulo": "Portatil 06", "imagen": "./img/portatiles/06.jpg", "precio": 899 },
        { "titulo": "Portatil 07", "imagen": "./img/portatiles/07.jpg", "precio": 700 },
        { "titulo": "Portatil 08", "imagen": "./img/portatiles/08.jpg", "precio": 400 },
        { "titulo": "Televisiones 01", "imagen": "./img/televisiones/01.jpg", "precio": 500 },
        { "titulo": "Televisiones 02", "imagen": "./img/televisiones/02.jpg", "precio": 1000 },
        { "titulo": "Televisiones 03", "imagen": "./img/televisiones/03.jpg", "precio": 700 },
        { "titulo": "Televisiones 04", "imagen": "./img/televisiones/04.jpg", "precio": 550 },
        { "titulo": "Televisiones 05", "imagen": "./img/televisiones/05.jpg", "precio": 1200 }
    ]; 
    
    const contenedorProductos = document.getElementById("contenedor-productos");

    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
    
        productoDiv.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar">Agregar</button>
            </div>
        `;
    
        contenedorProductos.appendChild(productoDiv);
    });
    
});
