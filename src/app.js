//IMPORTS DEPENDENCIAS
import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import {Server} from 'socket.io';
import ios from 'socket.io-express-session';
import mongoose  from 'mongoose';
import passport from 'passport'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {fork} from 'child_process';
import core from 'os';
import cluster from 'cluster';
import compression from 'compression';
import log4js from 'log4js';
import {mailing} from './comunication/gmail.js';
import {smsing} from './comunication/sms.js';
import {wsping} from './comunication/whatsApp.js' 


//IMPORTS JS
import __dirname from './utils.js';
import upload from './service/upload.js';
import {productos, usuario, mensajes} from './daos/index.js' 
import products from './routes/products.js';
import cart from './routes/cart.js'
import config,{argProcesados} from './config.js';
import { baseSession } from './config.js';
import {initializePassport} from './passport-config.js';

mongoose.connect(config.mongo.url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log("Mongodb esta conectado");}).catch(()=>{console.log("Mongodb se se ha podido conectar"),process.exit()});

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
app.engine('handlebars', engine());
app.set('views',__dirname+'/viewsHandlebars');
app.set('view engine','handlebars');
//LOGGER
log4js.configure({
  appenders:{
    console:{type:"console"},
    error:{type:"file",filename:"./src/logger/error.log"},
    info:{type:"file",filename:"./src/logger/info.log"},
    warn:{type:"file",filename:"./src/logger/warn.log"},

    errorFilter: {
      type: "logLevelFilter",
      appender: "error",
      level: "error",
      maxLevel: "error",
    },
    warnFilter: {
      type: "logLevelFilter",
      appender: "warn",
      level: "warn",
      maxLevel: "warn",
    },
    infoFilter: {
      type: "logLevelFilter",
      appender: "info",
      level: "info",
      maxLevel: "info",
    },
  },
  categories:{
    default:{
      appenders:["console","errorFilter","warnFilter","infoFilter"],level:"info"
    }
  }
})
const logger =log4js.getLogger()

//JSON
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    // console.log('Hora de petición: '+time.toTimeString().split(" ")[0],req.method,req.url);
    logger.info(req.method,req.url);
    req.auth = admin; 
    next();
    
})
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
app.use('/api/carritos',cart);

app.get('/api/error',(req,res)=>{
  logger.error("Error")
  res.send("error")
});

//SUBIR IMAGEN
app.post('/api/uploadfile',upload.single('image'),(req,res)=>{
    const files = req.file; 
    console.log(files);
    if(!files||files.length === 0){
        res.status(500).send({message: 'Error al subir archivo'})
    }
    res.send(files)
})
//SESION USUARIO
app.get('/currentUser',(req,res)=>{
    if (req.user) return res.send(req.user);
    return res.send({error:-2,message:"Session cerrada"})
})

//REGISTRO DE USUARIO
app.post('/api/register',passport.authenticate('register',{failureRedirect:'/api/failedRegister'}),(req,res)=>{ 
    res.send({message:"Registro correcto"})
})

//FALLA DE REGISTRO
app.get('/api/failedRegister',(req,res)=>{
    res.send({error: -2,message:'Error de autenticacion'}) 
})
//LOGIN USUARIO
app.post('/api/login',passport.authenticate('login',{failureRedirect:'/api/failedLogin'}), async (req,res)=>{
    res.send({message:"Login correcto"});
})
//FALLA DE LOGIN
app.post('/api/failedLogin',(req,res)=>{
    res.send({error: -2, message:'Error de Logueo'}) 
})
//LOGOUT USUARIO
app.get('api/logout', (req,res)=>{
    req.session.destroy(error=>{
        if(error)return res.send({error: "Error de logout"})
                        res.send({error: "Hasta luego!"})

        
    })
})
//VISTA ARTICULOS
app.get('/views/articulos',(req,res)=>{
    productos.getAll().then(result=>{
        let info = result.product;
        let infoObj ={
            productos:info
        }       
        res.render('articulos',infoObj)
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

//RANDOM
app.get("/api/random", (req, res) => {
    console.log(`Peticion recibida al worker ${process.pid}`)
    const cant = parseInt(req.query.cant || 100000000);
    if (isNaN(cant)) {
      res.status(400).send({
        message: "No es un numero",
      });
      return;
    }
    const random = fork("./service/random.js", [cant]);
    random.on("message", (data) => {
      res.json({ vueltas: cant, numero: data });
      console.log(`Peticion recibida al worker ${process.pid} finalizada`)
    });
  });

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

//SOCKET
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    let products = await productos.getAll();

    socket.emit('actualiza', products); 
    socket.on('msj', async data=>{
        console.log(data) 
        console.log(socket.handshake.session.passport.user)
        let user = await usuario.getBy(socket.handshake.session.user)
        console.log(user)
        let mjs = {
            user:user.user._id,//ACA ESTA EL ERROR 
            usuario:user.user.usuario,
            message: data.message
        }
            await mensajes.saveMessage(mjs);
        const textos = await mensajes.getAll();
        console.log(textos.product)
        io.emit('log',textos.product); 

        })
})


