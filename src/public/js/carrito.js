let idCarrito= document.getElementById('idCarrito')
let usuario = []

function crearCarrito(){
    fetch('/api/carrito/',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
    }).then(function(res){ 
      fetch('/api/currentUser')
      .then(res => res.json())
      .then(json=>{usuario=json
      
          bienvenido.innerHTML = 'Usuario: ' + usuario[0].usuario;
          avatar.innerHTML = '<img width="30" height="30" src="' + usuario[0].avatar + '">';
          idCarrito.innerHTML = 'Carrito: Id' + usuario[0].carrito;
          
      })
    })    
}

function agregarProducto(){
  let value = document.getElementById('idProducto').innerText
  fetch(`/api/carrito/${usuario[0].carrito}/${value}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
  })
}

