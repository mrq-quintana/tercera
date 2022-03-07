const { default: ProductosMongo } = await import('./productos/productosMongo.js')
const { default: CarritoMongo } = await import('./carrito/carritoMongo.js')
const { default: UsersMongo } = await import('./usuarios/usersMongo.js')
const { default: MessagessMongo } = await import('./mensajes/messagesMongo.js')
let productos = new ProductosMongo()
let carrito = new CarritoMongo()
let usuario = new UsersMongo()
let mensajes = new MessagessMongo()   

export { productos,carrito,usuario,mensajes };