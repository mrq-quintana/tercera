import Schema from "mongoose";
import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

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