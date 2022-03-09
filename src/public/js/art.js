let bienvenido = document.getElementById('bienvenido');
let avatar = document.getElementById('avatar');
let tabla = document.getElementById('idProductos')

fetch('/api/currentUser')
.then(res => res.json())
.then(json=>{usuario=json
    bienvenido.innerHTML = 'Usuario: ' + usuario[0].usuario;
    avatar.innerHTML = '<img width="100" height="100" src="' + usuario[0].avatar + '">';
})


fetch('/api/productos')
.then(res => res.json())
.then(info=>{
    let productos = info.product
    productos.map(producto=>{
        tabla.innerHTML += `<div class="pet-container"><div class="pet-card"><div id="idProducto">${producto._id}</div><img src="${producto.thumbnail}"/>${producto.title}<br>${producto.stock}<br>$${producto.price}</div></div>`;
    })
    console.log(productos)
})
