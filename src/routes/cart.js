import express from 'express';
import {carrito} from '../daos/index.js'
const router = express.Router();


//GET
router.get('/:id', (req,res)=>{
    const usuarioId = req.params.id;
    carrito.getById(usuarioId).then((result)=>{
        res.send(result);
        console.log(result.message);
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
//POST
router.post('/',(req, res)=>{
    carrito.saveCart().then(result=>{
        res.send(result);
    })
})
router.post('/:id',(req, res)=>{
    const idCarrito = req.params.id;
    let idAgregar = req.body.id; 
    carrito.addToCart(idAgregar,idCarrito).then(result=>{
        res.send(result);
        console.log(result.message)
    })
})
export default router;