const stockProductos = [
  {
    id: 1,
    nombre: "Arcoiris Waldorf",
    cantidad: 6,
    desc: "Arcoiris de madera color pastel",
    precio: 7200,
    img: "img/arcoiris.jpg",
  },
  {
    id: 2,
    nombre: "Didactico para suma",
    cantidad: 7,
    desc: "Juego didactico para sumar en madera",
    precio: 4500,
    img: "img/apilable-suma.jpg",
  },
  {
    id: 3,
    nombre: "Autito",
    cantidad: 5,
    desc: "Autito de madera",
    precio: 5500,
    img: "img/auto.jpg",
  },
  {
    id: 4,
    nombre: "Avion",
    cantidad: 3,
    desc: "Avion de madera",
    precio: 6000,
    img: "img/avion.jpg",
  },
  {
    id: 5,
    nombre: "Laberinto",
    cantidad: 2,
    desc: "Laberinto prono",
    precio: 7200,
    img: "img/prono.jpg",
  },
  {
    id: 6,
    nombre: "Bloques",
    cantidad: 4,
    desc: "Bloques didacticos de madera",
    precio: 4300,
    img: "img/bloques.jpg",
  },
  {
    id: 7,
    nombre: "Camion",
    cantidad: 6,
    desc: "Camion de madera",
    precio: 4500,
    img: "img/camion.jpg",
  },
  {
    id: 8,
    nombre: "Didactico",
    cantidad: 5,
    desc: "Juego didactico de madera",
    precio: 5400,
    img: "img/didactico.jpg",
  },
  {
    id: 9,
    nombre: "Encastre",
    cantidad: 3,
    desc: "Juego de encastre en madera",
    precio: 4700,
    img: "img/encastre.jpg",
  },
  {
    id: 10,
    nombre: "Gusanito",
    cantidad: 6,
    desc: "Gusanito de madera",
    precio: 6500,
    img: "img/gusanito.jpg",
  },
  {
    id: 11,
    nombre: "Tren",
    cantidad: 4,
    desc: "Trencito de madera",
    precio: 4200,
    img: "img/tren.jpg",
  },
]
let carrito = []

const contenedor = document.querySelector("#contenedor")
const carritoContenedor = document.querySelector("#carritoContenedor")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const precioTotal = document.querySelector("#precioTotal")
const activarFuncion = document.querySelector("#activarFuncion")
const procesarCompra = document.querySelector("#procesarCompra")
const totalProceso = document.querySelector("#totalProceso")
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido)
}

if (formulario) {
  formulario.addEventListener('submit', enviarPedido)
}
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || []
  mostrarCarrito()
  
  if(activarFuncion) {
  document.querySelector("#activarFuncion").click(procesarPedido)
  }
})

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = []
    mostrarCarrito()
  })
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "??Tu carrito est?? vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    } else {
      location.href = "compra.html"
    }
  })
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod
  if (contenedor) {
    contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem">
        <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
        </div>
      </div>
      `
  }
})

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body")
  if (modalBody) {
    modalBody.innerHTML = ""
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod
      modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
            <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad :${cantidad}</p>
            <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        `
    })
  }

  if (carrito.length === 0) {
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">??No agregaste ningun producto!</p>
      `
  } else {
    
  }
  carritoContenedor.textContent = carrito.length

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    )
  }

  guardarStorage()
}

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function eliminarProducto(id) {
  const juegoId = id
  carrito = carrito.filter((juego) => juego.id !== juegoId)
  mostrarCarrito()
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody")
    const { id, nombre, precio, img, cantidad } = prod
    if (listaCompra) {
      const row = document.createElement("tr")
      row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}">
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `
      listaCompra.appendChild(row)
    }
  })
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  )
}


  function enviarPedido(e){
  e.preventDefault()
  const persona = document.querySelector('#persona').value
  const email = document.querySelector('#correo').value

  if (email === '' || persona == '') {
    Swal.fire({
      title: "??Debes completar tu email y nombre!",
      text: "Completa el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  } else {
    
    const spinner = document.querySelector('#spinner')
    spinner.classList.add('d-flex')
    spinner.classList.remove('d-none')
    
    const btn = document.getElementById('button')
    

    btn.value = 'Enviando...'

    const serviceID = 'default_service'
    const templateID = 'template_qxwi0jn'

    
    setTimeout(() => {
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()

      const alertExito = document.createElement('p')
      alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-md-12', 'mt-2', 'alert-success')
      alertExito.textContent = 'Compra realizada correctamente'
      formulario.appendChild(alertExito)

      setTimeout(() => {
        alertExito.remove()
      }, 3000)


    }, 3000)
  }
  localStorage.clear()

}