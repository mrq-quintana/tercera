import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import yargs from 'yargs';
import dotenv from 'dotenv';

dotenv.config();

const argumentos = yargs(process.argv.slice(2));
export const argProcesados = argumentos.options({
    port: {
      alias: "p",
      default: process.env.PORT || 8080,
      describe: "Escuchando en el puerto",
      type: "number",
    },
    mode: {
      alias: "m",
      default: "fork",
      describe: "Modo que corre el server",
      type: "string",
      choices: ["fork", "cluster"],
    },
  }).argv;

export default {

    PORT:argProcesados.port,
    MODE:argProcesados.mode,

    mongo:{ 
        url:process.env.MONGO_URL||'mongodb://localhost:27017/Ecommerce',
    }
}

export const baseSession = (session({
    store:MongoStore.create({mongoUrl:process.env.MONGO_URL}),
    secret:process.env.SECRET,
    key: 'sid',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:60000},
}))