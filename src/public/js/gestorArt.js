
// CHAT
const socket = io();
//ACTUALIZA LISTA
socket.on('actualiza', data=>{
    let prod = data.product;
    fetch('../templates/productsTable.handlebars').then(string=> string.text()).then(template=>{
        const plantilla = Handlebars.compile(template);
        const objPlantilla={ productos:prod}
        const html = plantilla(objPlantilla);

        let div = document.getElementById('idProductos');
        div.innerHTML= html;
    })
})

let usuario;

fetch('/currentUser').then(result=>result.json()).then(json=>{ 
    usuario=json;
    if(json.error===-2){        
        location.replace('./login.html')
    } else{
        let bienvenido = document.getElementById('bienvenido');
        let avatar = document.getElementById('avatar');
        bienvenido.innerHTML = 'Bienvenido ' + usuario[0].usuario;
        avatar.innerHTML = '<img width="100" height="100" src="' + usuario[0].avatar + '">';
    }
    })
    

//GESTOR DE PRODUCTOS
let formProduct= document.getElementById('formProduct');
                 formProduct.addEventListener('submit',enviarForm);

function enviarForm(event){
    event.preventDefault();
    let data = new FormData(formProduct);
    fetch('/api/productos',{
        method:'POST',
        body:data
    }).then(result=>{
        return result.json();
    }).then(json=>{
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
                timer:2000,
            })
        }
    })
    formProduct.reset();
}

//FOTO PRELIMINAR
document.getElementById("image").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "Foto de producto"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}

//INTERACCION CHAT
let input = document.getElementById('idChat');

input.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            let timestamp = Date.now();
            let time = new Date(timestamp);
            socket.emit('msj', {message:e.target.value, hoy:time.toLocaleDateString() , hora:time.toTimeString().split(" ")[0]})
            e.target.value="";
        }else{
            console.log('Mensaje vacio')
        }
    }
})

socket.on('log',textos=>{
    let p =document.getElementById('log');
    let todosMsj = textos.map(message=>{
        return `<div>
                    <span>${message.usuario} dice: ${message.message}, ${message.createdAt}</span>
                </div>`
    }).join('');
    p.innerHTML = todosMsj; 
})

//--FIN--//



