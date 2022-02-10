import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

export default class ProductoMongo extends ContenedorMongo{
    constructor(){
        super(
            'products',
            {
              title: {type:String , required:true},
              price: {type:Number , required:true},
              description: {type:String , required:true},
              codigo:{type:String , required:true},
              stock:{type:Number , required:true},
              thumbnail :{type:String},
            },{timestamps:true}
        )
    }
}