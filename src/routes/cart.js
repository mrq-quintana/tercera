import express from 'express';
import {carrito, usuario, productos} from '../daos/index.js'

const router = express.Router();



//GET
router.get('/:id', (req,res)=>{
    const usuarioId = req.params.id;
    carrito.getById(usuarioId).then((result)=>{
        res.send(result[0].productos);
        let productosDeCarrito = result[0].productos;
        productosDeCarrito.map(productoDeCarrito=>{
            productos.getById(productoDeCarrito).then((result)=>{
                console.log(result);
            })
        })
    })
})
router.get('/', (req,res)=>{
  res.render('carrito')
    })



//POST
router.post('/',(req, res)=>{
    carrito.saveCart().then(result=>{
        let cart = result.cart;
        let idUser =req.user[0]._id;
        req.user[0].carrito=cart;
        usuario.updateUser(idUser,req.user[0]).then(result=>{
            res.send(result);
    
        })
    })
})

router.post('/:id/:pid',(req, res)=>{
    const idCarrito = req.params.id;
    const idAgregar = req.params.pid;
    carrito.addToCart(idAgregar,idCarrito).then(result=>{
        console.log(result)
        res.send(result);
        
    })
})






//DELETE
router.delete('/:id', (req,res)=>{
    const carritoId = req.params.id;
    carrito.deleteById(carritoId).then((result)=>{
        res.send(result);   
    })
})
router.delete('/:id/productos/:id_prod', (req,res)=>{
    const idCarrito = req.params.id;
    const id_prod = req.params.id_prod
    carrito.deleteProductById(idCarrito,id_prod).then((result)=>{
        res.send(result);  
    })
})

export default router;