import admin from 'firebase-admin';
import config from '../config.js';


admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:"https://ecommerce-8868d.firebaseio.com"
})

const db = admin.firestore();
var timestamp = Date.now();
var time = new Date(timestamp);

export default class ContenedorFirebase {

    constructor(ruta) {
        this.coleccion = db.collection(ruta)
        
    }
    //CREATES
    async saveProduct(productoAgregar) {
        try {
            let producto = productoAgregar;            
            let info = await this.coleccion.get();
            let title = info.docs
            let documentos = title.map(documento=>documento.data().title)
            let documentosTitle = documentos.filter(title=>title === producto.title)
            
            if(documentosTitle.length === 0){
                let doc = await this.coleccion.add(producto);
                let id = doc.id;
                producto.id = id;
                producto.timestamps = time.toLocaleDateString() +" , "+ time.toTimeString().split(" ")[0],
                await this.coleccion.doc(doc.id).update(producto);
                return { product: doc.docs, message: "Producto agregado" };
            } else{
                return { message: "No se agrego el producto ya existe" };
            }
        } catch (error) {
            return {message: "No se pudo agregar Producto " + error};
        }
    }
    async saveCart(productoAgregar){
        try {
            let producto = productoAgregar;
            let doc = await this.coleccion.add(productoAgregar);
            let id = doc.id;
            producto.id = id;
            producto.timestamps = time.toLocaleDateString() +" , "+ time.toTimeString().split(" ")[0],
            await this.coleccion.doc(doc.id).update(producto);
            return { message: "Carrito creado con id: "+ doc.id };
        } catch (error) {
            return {message: "No se pudo agregar Producto " + error};
        }
    }
    //READS
    async getAll(){
        try{
            let info = await this.coleccion.get();
            let doc = info.docs;
            let documentos = doc.map(documento=>documento.data())
            if (documentos.length > 0) {
                return { product: documentos, message: "Estos son todos los productos"};
            } else {
                return {message: "No se encontraron productos"};
            }
        } catch (error) {
                return {message: "No se pudo realizar accion" + error};
        }
    }
    async getById(id) {
        try{
            let info = await this.coleccion.doc(id).get();
            let doc = info.data();
            if (doc !== undefined) {
                return { product: doc, message: "Estos son todos los productos"};
            } else {
                return {message: "No se encontraron productos"};
            }
        } catch (error) {
                return {message: "No se pudo realizar accion" + error};
        }
    }    
    //DELETES
    async deleteAll(){ 
        try{
            let info = await this.coleccion.get();
            let doc = info.docs;

            if(doc.length !== 0){
                let documentos = doc.map(documento=>documento.data().id)
                documentos.forEach(id=> this.coleccion.doc(id).delete());
                return { message: "Productos eliminados correctamente"};
            }else{
                return { message: "No hay prdoctos para eliminar"};
            }
        }catch(error){
            return {message: "No se pudo realizar accion" + error};
        }
    }
    async deleteById(id) {
        try{
            let info = await this.coleccion.doc(id).get();
            let doc = info.data();
            if (doc !== undefined) {
                let info = await this.coleccion.doc(id).delete();
                return { product: info, message: "Producto eliminado correctamente"};
            } else {
                return {message: "No se encontraron productos para eliminar con ese Id"};
            }
        } catch (error) {
                return {message: "No se pudo realizar accion" + error};
        }
    }
    async deleteProductById(idCarrito,id_prod){
        try{
        let doc = await this.coleccion.doc(idCarrito).get();
            let document = doc.data();
            let productosEnCarrito = document.productos.filter(i=>i!==id_prod);
            let idAEliminar = document.productos.filter(i=>i===id_prod);
            document.productos=[];
            productosEnCarrito.forEach(i=>document.productos.push(i))
            
            if ((idAEliminar.length) !== 0) {
                await this.coleccion.doc(idCarrito).set(document);
                return {message: "Se ha eliminado el producto correctamente"};
            } else {
                return {message: "No se encontraron productos para eliminar"};
            }
        } catch (error) {
                return {message: "No se pudo realizar accion" + error};
        }
    }
    //UPDATES
    async updateProduct(id,body){
        try {
            let info = await this.coleccion.doc(id).get();
            let doc = info.data();
            if (doc !== undefined) {
            const doc = await this.coleccion.doc(id).set(body);
                return { message: "Producto actualizado" }
            }else{
                return { message: "No se pudo actualizar producto" }
            }
        } catch (error){
            return { message: "Error al actualizar el producto" }
        }
    }
    async addToCart(idAgregar,idCarrito){
        try{
            let doc = await this.coleccion.doc(idCarrito).get();
            let document = doc.data();
            let info = await db.collection('products').get();
            let idDocument = info.docs;
            let documentos = idDocument.map(documento=>documento.data().id)
            let idEncontrado = documentos.find(i=>i===idAgregar);
            if(idEncontrado===idAgregar){
                document.productos.push(idAgregar);
                if (doc !== undefined) {
                    await this.coleccion.doc(idCarrito).set(document);
                    return { product: document, message: "Productos agregado al carrito "+idCarrito};
                } 
            }
            else {
                return {message: "No se encontraron productos para agregar al carrito"};
            }
        } catch (error) {
                return {message: "No se pudo realizar accion" + error};
        }
    }

}
