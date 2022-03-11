//IMPORTS DEPENDENCIAS
import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import ios from 'socket.io-express-session';
import {engine} from 'express-handlebars';
import passport from 'passport'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import core from 'os';
import cluster from 'cluster';
import compression from 'compression';

//IMPORTS JS
import __dirname from './utils.js';
import upload from './service/upload.js';
import {productos, usuario, mensajes} from './daos/index.js' 
import products from './routes/products.js';
import cart from './routes/cart.js'
import config,{argProcesados} from './config.js';
import { baseSession } from './config.js';
import {initializePassport} from './service/passport-config.js';
import { isAuthenticated } from './auth/auth.js';
import logger from "./logger/logger.js";
import {mailing} from './comunication/gmail.js';
import {smsing} from './comunication/sms.js';
import {wsping} from './comunication/whatsApp.js' 

const admin =true;
const app = express(); 

if (config.MODE === "cluster" && cluster.isPrimary) {
  const hilos = core.cpus().length;
  console.log(`Proceso iniciado: ${process.pid} con ${hilos} worker trabajando`);

  for (let i = 0; i < hilos; i++) {
    cluster.fork();
  }
  
  cluster.on("exit", (worker, _code, _signal) => {
    console.log(`El proceso ${worker.process.pid} fallo.`);
    cluster.fork();
  });
} else{
var server = app.listen(config.PORT, () => {console.log("Escuchando en puerto " + config.PORT);});
server.on("error", (error) =>console.log(`Error en servidor ${error}`));
}

export const io = new Server(server);


//VIEWS
// app.set('views',__dirname + '/public/views');
// app.set('view engine','ejs');
//VIEWS
// app.engine('handlebars', engine());
app.engine('handlebars', engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


//JSON
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next)=>{logger.info(req.method,req.url);req.auth = admin;next();})
//SESION
app.use(baseSession);
io.use(ios(baseSession));
//PASSPORT
initializePassport(); 
app.use(passport.initialize());
app.use(passport.session());
//ROUTER
app.use(express.static(__dirname+'/public'));
app.use('/api/productos',products);
app.use('/api/carrito',cart);

//RUTAS

//SESION USUARIO
app.get('/api/currentUser',isAuthenticated,(req,res)=>{
  let usuarioActual = req.user;
  if (usuarioActual) return res.send(usuarioActual)
  else               return res.redirect('/api/login')
})

app.get('/api/perfil',(req,res)=>{
   res.render('perfil')
})

app.get('/api/gestor',(req,res)=>{
  res.render('gestor')
})

//PAGINA DE INICIO
app.get('/',(req,res)=>{
  res.redirect('/api/login')
})

//REGISTRO DE USUARIO
app.get('/api/register',(req,res)=>{
  res.render('register')
})
app.post('/api/register',upload.single('image'),passport.authenticate('register',{
  failureRedirect:'/api/failedRegister',
  successRedirect:'/api/login',
  passReqToCallback: true
}
),(req,res)=>{ 
  res.send({message:"Registro correcto"})
})
//FALLA DE REGISTRO
app.get('/api/failedRegister',(req,res)=>{
    res.send({error: -2,message:'Error de autenticacion'}) 
})



//LOGIN USUARIO
app.get('/api/login',(req,res)=>{
  res.render('login')
})

app.post('/api/login',passport.authenticate('login',{
  failureRedirect:'/api/login',
  successRedirect:'/api/perfil',
}
), async (req,res)=>{
    res.send({message:"Login correcto"});
})

//FALLA DE LOGIN
app.post('/api/failedLogin',(req,res)=>{
    res.send({error: -2, message:'Error de Logueo'}) 
})
//LOGOUT USUARIO
app.get('/api/logout', (req,res)=>{
  req.logout();
  res.redirect('/api/login');   
})
//VISTA ARTICULOS
app.get('/api/articulos',(req,res)=>{
  productos.getAll().then(data=>{
    let result=data.product
    res.render('art', result) 
 })
})

//INFO
app.get('/api/info', (req, res) => {
    const info = {
      argumentos: argProcesados,
      rutaEjecucion: process.execPath,
      platforma: process.platform,
      version: process.version,
      direccionProyecto: process.cwd(),
      memoriaReservada: process.memoryUsage().rss,
      procesadores: core.cpus().length, 
      idProceso: process.pid,
    };
    res.send(info);
  });

//COMUNICACION
app.get('/api/mail', (req, res) => {
  mailing().then(result=>{
    res.send(result);
    console.log(result.message);
  });
});
app.get('/api/sms', (req, res) => {
  smsing().then(result=>{
    res.send(result);
    console.log(result.message);
  });
});
app.get('/api/wsp', (req, res) => {
  wsping().then(result=>{
    res.send(result);
    console.log(result.message);
  });
});

//RUTA NO AUTORIZAADA
app.use((req,res,next)=>{
    res.status(404).send({message:"La ruta que desea ingresar no existe"}) 
    logger.warn(req.method,req.url,"La ruta que desea ingresar no existe" );
})



