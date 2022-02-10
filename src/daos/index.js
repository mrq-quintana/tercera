let productos;
let carrito;
let usuario;
let mensajes;
let sesion;
let persistencia = 'mongo';

switch (persistencia) {
    case 'fileSystem':
        const { default: ProductosArchivo } = await import('./productos/productosArchivo.js')
        const { default: CarritoArchivo } = await import('./carrito/carritoArchivo.js')
        productos = new ProductosArchivo()
        carrito = new CarritoArchivo()
        break
    case 'mongo':
        const { default: ProductosMongo } = await import('./productos/productosMongo.js')
        const { default: CarritoMongo } = await import('./carrito/carritoMongo.js')
        const { default: UsersMongo } = await import('./usuarios/usersMongo.js')
        const { default: SessionMongo } = await import('./usuarios/sessionMongo.js')
        const { default: MessagessMongo } = await import('./mensajes/messagesMongo.js')
        productos = new ProductosMongo()
        carrito = new CarritoMongo()
        usuario = new UsersMongo()
        sesion= new SessionMongo()
        mensajes = new MessagessMongo()
        break
    case 'firebase':
        const { default: ProductosFirebase } = await import('./productos/productosFirebase.js')
        const { default: CarritoFirebase } = await import('./carrito/carritoFirebase.js')
        productos = new ProductosFirebase()
        carrito = new CarritoFirebase()
        break
}
export { productos, carrito, usuario, sesion,mensajes };