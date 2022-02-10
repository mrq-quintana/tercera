import fs from 'fs';
import config from '../config.js';

export default class ContenedorArchivo{
    constructor(ruta){
        this.url = `${config.fileSystem.url}${ruta}`;
    }
    //READS
    async getAll(){
        try{
            let info = await fs.promises.readFile(this.url, "utf-8");
            let infoJson = JSON.parse(info);
        
            if (infoJson !== []) {
            return { product: infoJson, message: "Estos son todos los productos"};
            } else {
            return {message: "No se encontraron productos",};
            }
        } catch (error) {
            return {
                message: "No se pudo realizar accion" + error,
            };
        }
    }
    async getById(id){
      id = parseInt(id);
      try{
          let info = await fs.promises.readFile(this.url, "utf-8");
          let infoJson = JSON.parse(info);
          let infoId = infoJson.find((i) => i.id === id);

          if (infoId) {
          return { product: infoId, message: "Id encontrado" };
          } else {
          return {
              message: "No se pudo encontrar Id ",
          };
          }
      } catch(error){
          return {
              message: "No se pudo realizar accion" + error,
          };
      }

    }
    //DELETES
    async deleteById(id){
        id= parseInt(id);
        try{
            let info = await fs.promises.readFile(this.url, "utf-8");
            let infoJson = JSON.parse(info);
            let infoId = infoJson.filter((i) => i.id !== id);
            let infoIdEliminado = infoJson.filter((i) => i.id === id);
            console.log(infoIdEliminado.length)
            if (infoIdEliminado.length > 0) {
            await fs.promises.writeFile(this.url,JSON.stringify(infoId, null, 2));
            return {product: infoIdEliminado , message: "Item " + id + " eliminado",};
            } else {
            return {message: "No existe item a eliminar"};
            }
        } catch(error){
            return {
                message: "No se pudo realizar accion" + error};
        }
    }
    async deleteAll(){
        try{
            let info = await fs.promises.readFile(this.url, "utf-8");
            let infoJson = JSON.parse(info);       
            if (infoJson !== []) {
              fs.promises.writeFile(this.url,JSON.stringify((infoJson = []), null, 2));
              return { message: "Todos los productos fueron eliminados"};
            } else{
              return { message: "No se puede eliminar"};
            }
        }catch(error){
            return {
                message: "No se pudo realizar accion" + error};
        }
        
    }
    async deleteProductById(idCarrito,id_prod){
        idCarrito = parseInt(idCarrito);
        id_prod = parseInt(id_prod);
        let info = await fs.promises.readFile(this.url, "utf-8");
        let infoJson = JSON.parse(info);
        let infoId = infoJson.find((i) => i.id === idCarrito);
        if(infoId){
            let productoEliminado = infoId.productos.filter((i) => i.id !== id_prod);
            let productoIdencontrado = infoId.productos.find((i) => i.id === id_prod);
            if(!productoIdencontrado){
              return {
                message: "No existe el producto en el carrito",  
              };
            }else{
              infoId.productos=[...productoEliminado];
              await fs.promises.writeFile(this.url, JSON.stringify(infoJson, null, 2));
              return {
                message: "Producto con id "+id_prod+" eliminado del carrito con id " + idCarrito +"",
              };
            }
        } else {
          return {
            message: "No existe el carrito",  
          };
        }
    }
    //CREATES
    async saveProduct(productoAgregar){
        try {
          let info = await fs.promises.readFile(this.url, "utf-8");
          let infoJson = JSON.parse(info);
    
          if (infoJson.some((i) => i.title === productoAgregar.title)) {
            return { message: 'El producto ' + productoAgregar.title + ' ya existe'};
          } else {
            let timestamp = Date.now();
            let time = new Date(timestamp);
            let productos = {
              id: parseInt(infoJson.length + 1),
              timestamp: time.toLocaleDateString() +" , "+ time.toTimeString().split(" ")[0],
              title: productoAgregar.title,
              price: parseInt(productoAgregar.price),
              description: productoAgregar.description,
              codigo:productoAgregar.codigo,
              stock:parseInt(productoAgregar.stock),
              thumbnail :productoAgregar.thumbnail,
            };
    
            infoJson.push(productos);
    
            try {
              await fs.promises.writeFile(this.url, JSON.stringify(infoJson, null, 2));
              return {message: "Producto agregado"};
            } catch (error) {
              return { message: "No se pudo agregar Producto " + error};
            }
          }
        } catch (error) {
          let productos = {
            id: 1,
            timestamp: time.toLocaleDateString() +" , "+ time.toTimeString().split(" ")[0],
            title: productoAgregar.title,
            price: parseInt(productoAgregar.price),
            description: productoAgregar.description,
            codigo:productoAgregar.codigo,
            stock:parseInt(productoAgregar.stock),
            thumbnail :productoAgregar.thumbnail,
          };    
          try {
            await fs.promises.writeFile(this.url, JSON.stringify([productos]), null, 2);
            return { prod: productos, message: "Producto agregado ya" };
          } catch (error) {
            return {message: "No se pudo agregar Producto " + error};
          }
        }
    }
    async saveCart(){
        try {
          let cart = await fs.promises.readFile(this.url, "utf-8");
          let cartJson = JSON.parse(cart);
          let timestamp = Date.now();
          let time = new Date(timestamp);
          
          let carrito = {
                id: parseInt(cartJson.length + 1),
                timestamp: time.toLocaleDateString() +" , "+ time.toTimeString().split(" ")[0],
                productos: []
              }; 
              cartJson.push(carrito);
                  try {
                    await fs.promises.writeFile(this.url, JSON.stringify(cartJson, null, 2));
                    return {message: `Carrito creado con Id ${carrito.id}`};
                  } 
                  catch (error){ return {message: "No se pudo agregar producto " + error};}      
        } catch (error){
            console.log(error)
        }
    }
    //UPDATES
    async updateProduct(id,body){
        id = parseInt(id);
        let info = await fs.promises.readFile(this.url, 'utf-8');
        let infoJson = JSON.parse(info);
        let infoId = infoJson.find((i) => i.id === id);
        if (infoId) {
          if (id) {
            infoJson.forEach((product) => {
              if (id === product.id) {
                product.title = body.title,
                product.price = body.price,
                product.description = body.description,
                product.codigo = body.codigo,
                product.stock = body.stock,
                product.thumbnail = body.thumbnail
                
              }
            })
            try {
              await fs.promises.writeFile(this.url, JSON.stringify(infoJson, null, 2));
              return { message: "Producto actualizado" }
            } catch {
              return { message: "Error al actualizar el producto" }
            }
          }
        }
        else {
          return { message: "No se encontro id para actualizar el producto" }
        }
    }
    async addToCart(idAgregar,idCarrito){
        idAgregar = parseInt(idAgregar);
        idCarrito = parseInt(idCarrito);
        let cart = await fs.promises.readFile(this.url, "utf-8");
        let cartJson = JSON.parse(cart);
        let info = await fs.promises.readFile(`${config.fileSystem.url}`+'products.txt', "utf-8");
        let infoJson = JSON.parse(info);     
        let cartId = cartJson.find((i) => i.id === idCarrito);
        let idAdd= infoJson.find((i)=> i.id === idAgregar);
      
        if (cartId && idAdd!==undefined){  
            cartId.productos.push(idAdd);
            await fs.promises.writeFile(this.url, JSON.stringify(cartJson, null, 2));
            return { message: "Id agregado correctamente al carrito "+idCarrito+" "};        
        }else{
          return { message: "El carrito o el producto no existe "};
        }
  
    }
}