let bienvenido = document.getElementById('bienvenido');
let avatar = document.getElementById('avatar');
let tabla = document.getElementById('idProductos')
let idProducto = document.getElementById('idProducto')
let usuario =[]
//MUESTRA USUARIO
fetch('/api/currentUser')
.then(res => res.json())
.then(json=>{usuario=json

    bienvenido.innerHTML = 'Usuario: ' + usuario[0].usuario;
    avatar.innerHTML = '<img width="30" height="30" src="' + usuario[0].avatar + '">';
    email.innerHTML = 'Email: ' + usuario[0].email;
    telefono.innerHTML = 'Telefono: ' + usuario[0].telefono;
  
   


//MUESTRA PRODUCTOS
fetch(`/api/carrito/${usuario[0].carrito[0]}`)
.then(res =>res.json()
)

    // .then(info=>{
    //     let productos = info.product
    //         productos.map(producto=>{
    //             tabla.innerHTML += `
    //                                 <div class="card " style="width: 18rem;">
    //                                     <img src="${producto.thumbnail}" class="card-img-top" alt="...">
    //                                     <div class="card-body">
    //                                     <h5 class="card-title">${producto.title}</h5>
    //                                     <p class="card-text">${producto.description}</p>
    //                                     <p class="card-text">$${producto.price}</p>
    //                                     <p id="idProducto">${producto._id}</p>
    //                                     <button onclick="agregarProducto()" class="btn btn-primary">Agregar</button>
    //                                     </div>
    //                                 </div>`;
    // })
// })
})