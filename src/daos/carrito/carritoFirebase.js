import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

export default class CarritosFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    
    }

    async saveCart(carrito = { productos: [] }) {
        return super.saveCart(carrito)
    }
}

