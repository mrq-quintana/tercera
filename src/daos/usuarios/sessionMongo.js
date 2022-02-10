import ContenedorMongo from "../../contenedores/ContenedorMongo.js";

export default class SeesionMongo extends ContenedorMongo{
    constructor(){
        super(
            'session',
            {
            usuario:{ type:String, default:"anonymus", unique:true},
            password:{ type:String, required:true}
            },{timestamps:true},
        ) 
    }
}