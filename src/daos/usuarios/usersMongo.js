import ContenedorMongo from "../contenedor/contenedor.js";

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
            password:{ type:String, required:true},
            telefono:{ type:String, required:true},
            direccion:{ type:String, required:true},
            rol:{ type:String, required:true},
            avatar:{ type:Object, required:true},
            carrito:[{
                type:Boolean,
                default:true
            }]    
            },
            {timestamps:true},
        ) 
    }
}