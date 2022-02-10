import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

export default class ProductosArchivo extends ContenedorArchivo{
    constructor(){
        super('products.txt')
    }
}