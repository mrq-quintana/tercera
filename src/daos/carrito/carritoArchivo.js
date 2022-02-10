import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

export default class CarritoArchivo extends ContenedorArchivo{
    constructor(){
        super('carrito.txt')
    }
}