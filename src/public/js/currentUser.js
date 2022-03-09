fetch('/api/currentUser')
.then(res => res.json())
.then(json=>{usuario=json
    console.log(json)
    let bienvenido = document.getElementById('bienvenido');
    let avatar = document.getElementById('avatar');
    let email = document.getElementById('email');
    let telefono = document.getElementById('telefono');
    let username = document.getElementById('username');

    bienvenido.innerHTML = 'Bienvenido ' + usuario[0].nombre +' '+ usuario[0].apellido ;
    avatar.innerHTML = '<img width="100" height="100" src="' + usuario[0].avatar + '">';
    email.innerHTML = 'Email: ' + usuario[0].email;
    telefono.innerHTML = 'Telefono: ' + usuario[0].telefono;
    username.innerHTML = 'Usuario: ' + usuario[0].usuario;

})

    
