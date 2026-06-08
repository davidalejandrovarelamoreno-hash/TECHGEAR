/* ========================================= */
/* CARRITO DE COMPRAS */
/* ========================================= */

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];

/* ========================================= */
/* PRODUCTOS Y PRECIOS */
/* ========================================= */

const precios = {

    "Teclado RGB":250000,
    "Microfono":120000,
    "Mouse Gamer":120000,
    "Audífonos RGB":100000,
    "Consolas":500000,
    "Notebook":10000,
    "Celular":5000000,
    "Laptop":2000000,
    "Cuaderno":10000,
    "Zapatos":60000

};

/* ========================================= */
/* BOTÓN COMPRAR AHORA */
/* ========================================= */

function mostrarMensaje(){

    alert("¡Bienvenido a TechGear!");

}

/* ========================================= */
/* AGREGAR PRODUCTO */
/* ========================================= */

function agregarCarrito(nombreProducto){

    let encontrado = carrito.find(

        item => item.nombre === nombreProducto

    );

    if(encontrado){

        encontrado.cantidad++;

    }else{

        carrito.push({

            nombre:nombreProducto,
            cantidad:1

        });

    }

    actualizarCarrito();

}

/* ========================================= */
/* SUMAR CANTIDAD */
/* ========================================= */

function sumarCantidad(index){

    carrito[index].cantidad++;

    actualizarCarrito();

}

/* ========================================= */
/* RESTAR CANTIDAD */
/* ========================================= */

function restarCantidad(index){

    carrito[index].cantidad--;

    if(carrito[index].cantidad <= 0){

        carrito.splice(index,1);

    }

    actualizarCarrito();

}

/* ========================================= */
/* ELIMINAR PRODUCTO */
/* ========================================= */

function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();

}

/* ========================================= */
/* ACTUALIZAR CARRITO */
/* ========================================= */

function actualizarCarrito(){

    let lista =
        document.getElementById("lista-carrito");

    let contador =
        document.getElementById("contador");

    let total =
        document.getElementById("total");

    if(!lista || !contador || !total){

        return;

    }

    lista.innerHTML = "";

    let suma = 0;

    let cantidadTotal = 0;

    carrito.forEach((item,index)=>{

        suma +=
            precios[item.nombre] *
            item.cantidad;

        cantidadTotal += item.cantidad;

        lista.innerHTML += `

        <li>

            <span>

                ${item.nombre}
                x${item.cantidad}

            </span>

            <div>

                <button onclick="sumarCantidad(${index})">
                    +
                </button>

                <button onclick="restarCantidad(${index})">
                    -
                </button>

                <button onclick="eliminarProducto(${index})">
                    ❌
                </button>

            </div>

        </li>

        `;

    });

    contador.textContent =
        "🛒 Productos: " + cantidadTotal;

    total.textContent =
        "💰 Total: $" +
        suma.toLocaleString();

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}

/* ========================================= */
/* ENVIAR PEDIDO A WHATSAPP */
/* ========================================= */

function enviarWhatsApp(){

    if(carrito.length === 0){

        alert("Tu carrito está vacío");

        return;

    }

    let mensaje =
        "Hola, quiero comprar:%0A%0A";

    carrito.forEach((item,index)=>{

        mensaje +=

            (index + 1) +

            ". " +

            item.nombre +

            " x" +

            item.cantidad +

            "%0A";

    });

    mensaje += "%0AGracias.";

    let numero = "573212589099";

    window.open(

        "https://wa.me/" +

        numero +

        "?text=" +

        mensaje,

        "_blank"

    );

}

/* ========================================= */
/* INICIAR CARRITO */
/* ========================================= */

actualizarCarrito();