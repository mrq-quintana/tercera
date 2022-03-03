import passport from 'passport'
import local from 'passport-local'
import {usuario} from './daos/index.js'
import { mailing} from './comunication/gmail.js';
import { passwordBcrypt, passwordNoBcrypt } from './utils.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () =>{
    passport.use('register', new LocalStrategy({passReqToCallback:true,usernameField:"email"}, async(req,username,password,done)=>{
        try {
            let user = await usuario.getBy(username);  
            if(user)return done(null,false);
            const newUser ={
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                email: req.body.email,
                telefono:req.body.telefono,
                usuario: username,
                password: passwordBcrypt(password),
                edad:req.body.edad,
                direccion:req.body.direccion,
                rol:req.body.rol,
                avatar:toString(req.body.image),
                carrito:[]                     
            };
            const mail ={
                from:"Confirmacion de registro <mail>",
                to: newUser.email,
                subject: "Registro correcto",
                html:`<h1 style="color:blue;"> Bienvenido registro correcto! </h1>`
            }
            const mailadmin ={
                from:"Nuevo registro <mail>",
                to: "mrq.quintana@gmail.com",
                subject: "Nuevo registro",
                html:`<h1 style="color:blue;"> ${newUser.nombre} ${newUser.apellido} </h1>
                      <br>
                      <h1 style="color:blue;"> ${newUser.direccion} </h1>
                      <br>
                      <h1 style="color:blue;"> ${newUser.telefono} </h1>
                      <br>
                      <h1 style="color:blue;"> ${newUser.email} </h1>`
            }
            mailing(mail);
            mailing(mailadmin);
            try {
                let result = await usuario.saveUser(newUser);
                console.log(result)
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