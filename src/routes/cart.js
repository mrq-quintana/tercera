import express from 'express';
import {carrito, usuario} from '../daos/index.js'

const router = express.Router();



//GET
router.get('/:id', (req,res)=>{
    const usuarioId = req.params.id;
    carrito.getById(usuarioId).then((result)=>{
        res.send(result);
        console.log(result);
    })
})



//POST
router.post('/',(req, res)=>{
    carrito.saveCart().then(result=>{
        let cart = result.cart;
        let idUser =req.user[0]._id;
        req.user[0].carrito=cart;
        usuario.updateUser(idUser,req.user[0]).then(result=>{
            res.send(result);
            console.log(req.user)
        })
    })
})

router.post('/:id',(req, res)=>{
    const idCarrito = req.params.id;
    let idAgregar = req.body.id; 
    carrito.addToCart(idAgregar,idCarrito).then(result=>{
        res.send(result);
        console.log(result)
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