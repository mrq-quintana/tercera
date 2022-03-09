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





