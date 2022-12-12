// PRODUCTOS
const productos = [
    {
        id: "Nintendo Swicht",
        titulo: "Nintendo Swicht",
        imagen: "./img/imagenes_nintendo/nintendosw.jpg",
        categoria: {
            nombre: "Nintendo",
            id: "nintendo"
        },
        precio: 140700
    },
    {
        id: "Nintendo Switch Lite",
        titulo: "Nintendo Switch Lite",
        imagen: "./img/imagenes_nintendo/nintendo1.jpg",
        categoria: {
            nombre: "Nintendo",
            id: "nintendo"
        },
        precio: 76500
    },
    {
        id: "Pokemon Arceus",
        titulo: "Pokemon Arceus",
        imagen: "./img/imagenes_nintendo/arceus.jpg",
        categoria: {
            nombre: "Nintendo",
            id: "nintendo"
        },
        precio: 14200
    },
    {
        id: "Mario Kart",
        titulo: "Mario Kart",
        imagen: "./img/imagenes_nintendo/mario-kart.png",
        categoria: {
            nombre: "Nintendo",
            id: "nintendo"
        },
        precio: 13100
    },
    {
        id: "Playstation 5",
        titulo: "Playstation 5",
        imagen: "./img/imagenes_playstation/ps5.jpg",
        categoria: {
            nombre: "Playstation",
            id: "playstation"
        },
        precio: 200000
    },
    {
        id: "Uncharted",
        titulo: "Uncharted",
        imagen: "./img/imagenes_playstation/uncharted.jpg",
        categoria: {
            nombre: "Playstation",
            id: "playstation"
        },
        precio: 11500
    },
    {
        id: "God of War:Ragnarok",
        titulo: "God of War:Ragnarok",
        imagen: "./img/imagenes_playstation/god.jpg",
        categoria: {
            nombre: "Playstation",
            id: "playstation"
        },
        precio: 13800
    },
    {
        id: "Horizon:Zero",
        titulo: "Horizon:Zero",
        imagen: "./img/imagenes_playstation/horizon.jpg",
        categoria: {
            nombre: "Playstation",
            id: "playstation"
        },
        precio: 10000
    },
    {
        id: "Xbox:One",
        titulo: "Xbox:One",
        imagen: "./img/imagenes_xbox/xbox.jpg",
        categoria: {
            nombre: "Xbox",
            id: "xbox"
        },
        precio: 180000
    },
    {
        id: "Cuphead",
        titulo: "Cuphead",
        imagen: "./img/imagenes_xbox/cup.jpg",
        categoria: {
            nombre: "Xbox",
            id: "xbox"
        },
        precio: 1500
    },
    {
        id: "Contra:remastered",
        titulo: "Contra:remastered",
        imagen: "./img/imagenes_xbox/contra.jpg",
        categoria: {
            nombre: "Xbox",
            id: "xbox"
        },
        precio: 4300
    },
    {
        id: "The Witcher 3",
        titulo: "The Witcher 3",
        imagen: "./img/imagenes_xbox/witcher.jpg",
        categoria: {
            nombre: "Xbox",
            id: "xbox"
        },
        precio: 7550
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =  ` 
        <div class="carta card m-5 p-5 border-warning">
        <img src="${producto.imagen}" class="producto-imagen card-img-top" alt="${producto.titulo}">
        <div class="card-body">
        <h5 class="producto-titulo card-title">${producto.titulo}</h5>
        <div class="producto-precio card-footer-precio">
            <big class="producto-precio text">$${producto.precio}</big>
          </div>
          <a class="producto-agregar btn btn-dark" id="${producto.id}" role="button">Agregar al carrito</a>
        </div>
        </div>
        </div>
        `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}