import Schema from "mongoose";
import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

export default class MessagesMongo extends ContenedorMongo{
    constructor(){
        super(
            'mensajes',
            { 
                user:{ type:Schema.Types.ObjectId, ref:'Users', required:true},
                usuario:{ type:String, required:true},
                message:{ type:String, required:true}
            },{timestamps:true}
        )
    }
}