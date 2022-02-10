import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

export default class UsersMongo extends ContenedorMongo{
    constructor(){
        super(
            'users',
            {
            nombre:{ type:String, required:true,},
            apellido:{ type:String, required:true,},
            edad:{ type:Number},
            usuario:{ type:String, default:"anonymus", unique:true},
            email:{type:String, required:true, unique:true},
            password:{ type:String, required:true}
            },
            {timestamps:true},
        ) 
    }
}