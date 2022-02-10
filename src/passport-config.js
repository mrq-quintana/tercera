import passport from 'passport'
import local from 'passport-local'
import {usuario} from './daos/index.js'
import { passwordBcrypt, passwordNoBcrypt } from './utils.js';

 
const LocalStrategy = local.Strategy;

export const initializePassport = () =>{
    passport.use('register', new LocalStrategy({passReqToCallback:true}, async(req,username,password,done)=>{
        try {
            let user = await usuario.getBy(username);  
            if(user)return done(null,false);
            const newUser ={
                usuario: username,
                password: passwordBcrypt(password),
                email: req.body.email,
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                edad:req.body.edad,       
            };
            try {
                let result = await usuario.saveUser(newUser);
                return done(null,result)
            } catch (error) {
                return done(error); 
            }
        } catch (error) {
            return done(error);
        }
    }))
    
    passport.use('login', new LocalStrategy(async(username,password,done)=>{
        try {
            let user = await usuario.getBy(username);
            if(!user)return done(null,false,{message:'Usuario no existe'});
            if(!passwordNoBcrypt(user,password)) return done(null,false,{message:'Password incorrecto'})
            console.log('Logueado');
            return done(null,user)
        } catch (error) {
            done(error)
        }
    }))
  
    passport.serializeUser(async (user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        let getUser = await usuario.getById(id);
        done(null,getUser);
    })
}