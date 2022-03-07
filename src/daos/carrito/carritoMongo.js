import Schema from "mongoose";
import ContenedorMongo from "../contenedor/contenedor.js";

export default class CarritoMongo extends ContenedorMongo{
    constructor(){
        super(
            'carritos',
            {
              productos:{
                type: [{
                        type: Schema.Types.ObjectId,
                        ref: 'products',
                      }],
                default:[],
              }
            },{timestamps:true}
        )
    }
}