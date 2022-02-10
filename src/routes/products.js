import express from 'express';
import upload from '../service/upload.js';
import { io } from '../app.js';
import { authAdmin } from '../utils.js'
import {productos} from '../daos/index.js'
const router = express.Router();


//GET
router.get('/', (req,res)=>{
    productos.getAll().then((result)=>{
        res.send(result);
        console.log(result.message);
    })
})
router.get('/:id', (req,res)=>{
    const usuarioId = req.params.id;
    productos.getById(usuarioId).then((result)=>{
        res.send(result);
        console.log(result.message);
    })
})
//DELETE
router.delete('/:id',authAdmin,(req,res)=>{
    const usuarioId = req.params.id;
    productos.deleteById(usuarioId).then((result)=>{
        res.send(result);
        console.log(result.message);
    })
})
router.delete('/', (req,res)=>{
    productos.deleteAll().then((result)=>{
        res.send(result);
        console.log(result.message);
    })
})
//POST
router.post('/',authAdmin,upload.single('image'),(req, res)=>{
    let productoAgregar = req.body;
    let thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+req.file.filename;
    productoAgregar.thumbnail = thumbnail;
    productos.saveProduct(productoAgregar).then(result=>{
        res.send(result);
        if(result){
            productos.getAll().then(result=>{
                io.emit('actualiza',result);
            })
        }
    })
})
//PUT
router.put('/:pid',authAdmin,(req,res)=>{
    let id = req.params.pid;
    let body = req.body;
    productos.updateProduct(id,body).then(result=>{
        res.send(result);
        console.log(result.message);
    })
})

export default router;