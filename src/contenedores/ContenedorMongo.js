import mongoose from 'mongoose';

export default class ContenedorMongo{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps));
    }

    //READS
    async getAll(){
        try{
            let doc = await this.collection.find(); 

            if (doc!==[]) {
            return { product: doc, message: "Estos son todos los productos"};
            } else {
            return {message: "No se encontraron productos"};
            }
        } catch (error) {
            return {message: "No se pudo realizar accion" + error};
        }
    }
    async getById(id){
        try{
            let doc = await this.collection.find({_id:id});
            
            if (doc.length > 0) {
            return doc;
            } else {
            return {message: "No se pudo encontrar Id "};
            }
        } catch(error){
            return {message: "No se pudo realizar accion " + error};
        }
  
    }
    async getByUser(loginUsuario){
        try{
            let usuarioRegistrado = await this.collection.find({email:loginUsuario.email});
            if (usuarioRegistrado[0].email===loginUsuario.email && usuarioRegistrado[0].password===loginUsuario.password) {
            return {status:200 ,user:usuarioRegistrado[0]};
            }else{ return {status:400, error: -2, user:[], message: "No se pudo loguear correctamente"};}
        } catch(error){return {message: "No se pudo realizar accion " + error};}
  
    }
    async getBy(usuario){
        try{
            let doc = await this.collection.find({usuario:usuario});
            if (doc) return doc[0];
        } catch(error){
            return {message: "No se pudo realizar accion " + error};
        }
    }
    //DELETES
    async deleteById(id){
        try{
            let doc = await this.collection.find({_id:id});
            
            if (doc.length > 0) {
                await this.collection.deleteOne({_id:id});
                return {message: "Item " + id + " eliminado",}; 
            }else{
                return { message: "No hay item para eliminar"};
            }     
        } catch(error){ 
            return {
                message: "No se pudo eliminar " + error};
        }
    }
    async deleteAll(){
        try{
            let doc = await this.collection.find().count();
            if(doc !== 0){
                await this.collection.deleteMany({});
                return { message: "Todos los productos fueron eliminados"};
            }else{
                return { message: "No hay productos para eliminar"};
            }
        } catch(error){ 
            return {
                message: "No se pudo eliminar " + error};
        }
    }
    async deleteProductById(idCarrito,id_prod) {
        try{
            let doc = await this.collection.find({$and:[{_id:idCarrito},{productos:id_prod}]}).count();
            if (doc > 0) {
                let document = await this.collection.updateOne({_id:idCarrito},{$pull:{productos:id_prod}});
                return {message: "Producto eliminado"};
            } else {
                return {message: "No se pudo eliminar con el producto"};
            }
        } catch(error){
                return {message: "No se pudo realizar accion " + error};
        }
    }
    //CREATES
    async saveProduct(productoAgregar) {
        try {
            let doc = await this.collection.find();
            if (doc.some((i) => i.title === productoAgregar.title)) {
                return { message: 'El producto ' + productoAgregar.title + ' ya existe'};
            } else {
                let producto = await this.collection.create(productoAgregar);
                               await producto.save(); 
            return { product: producto, message: "Producto agregado" };
            }
        } catch (error) {
            return {message: "No se pudo agregar Producto " + error};
        }
    }
    async saveUser(user) {
        try {
            let agregarUsuario = await this.collection.create(user);
                                 await agregarUsuario.save();
            return agregarUsuario;   
        } catch (error) {
            return {message: "No se pudo agregar usuario con errores " + error};
        }
    }
    async saveCart() {
        try {
          let cart = await this.collection.insertMany();
          return {message: "Carrito creado con ID "+ cart[0]._id};     
        } catch (error){
            return {message: "No se pudo agregar carrito " + error};
        }
    }
    async saveMessage(mensajes){
        try {
            let msj = await this.collection.create(mensajes);
                      await msj.save(); 
        } catch (error) {
            
        }
    }

    //UPDATES
    async updateProduct(id, body) {    
        try{
            if(await this.collection.countDocuments({_id:id}) === 1){
                await this.collection.updateOne({_id:id},body);
                return { message: id+" modificado correctamente"};
            }else{
                return { message: "No hay item para modificar"};
            } 
        }catch(error){
            return {message: "No se pudo agregar Producto " + error};
        }
    }
    async addToCart(idAgregar,idCarrito) {
        try{
            let doc = await this.collection.count({_id:idCarrito})
            if(doc > 0){
             await this.collection.updateOne({_id:idCarrito},{$push:{productos:idAgregar}});
            return {message: "Id agregado correctamente al carrito "+idCarrito+" "};
            }else{
                return {message: "No se puede agregar producto"};
            } 
        }catch(error){
            return {message: "No se pudo agregar Producto " + error};
        }
    }    
}