// TOMA DATOS DEL FORMULARIO DE REGISTRO
let form  = document.getElementById("registerForm");
form.addEventListener('submit',function(event){
    event.preventDefault();
    let data = new FormData(form);
    
    let dataUsuario ={
        nombre: data.get('nombre'),
        apellido: data.get('apellido'),
        edad: data.get('edad'),
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password')
    }
    fetch('/api/register',{
        method:"POST",
        body:JSON.stringify(dataUsuario),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(result=>result.json())
    .then(json=>{
           if(json.error === -2){
                Swal.fire({
                    title:'No se puede guardar',
                    text:json.message,
                    icon:'error',
                    timer:4000,
                })
            } else{
                Swal.fire({
                    title:'Guardado',
                    text:json.message,
                    icon:'success',
                    timer:5000,
                })
                setTimeout(location.replace('./pages/login.html'),5000);
        }
    })
    form.reset();
}) 