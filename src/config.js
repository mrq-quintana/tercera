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
      
    fileSystem:{
        url:__dirname+'/files/'
    },
    mongo:{ 
        url:process.env.MONGO_URL||'mongodb://localhost:27017/Ecommerce',
    },
    firebase:{
        "type": "service_account",
        "project_id": "ecommerce-8868d",
        "private_key_id": "0735a5982ddd6d9bae83210f7c0edee4bcb5b568",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCceFSyuLkM7DCr\nzkC3N1kn0+fTu3tkuwE4DcErsY0EVBVBDj3yFiTxBlHOhEjCj5TKV/D6RCYN6bt4\nY3PURnrtVy1+J3S/4KftpGi5HlCKPNMtno7qVKXfdRDzxYwvzdcrp2cTDLhXJUCK\n0+OOFm6cfOQtJr3LkUEj7qS3ZdQD4r+1YkOZqpzZQ35KBGpKoIOISYHlLKnJHsOC\ndX2NlS56BVH2MaKzUgrhqv0A9quKY2I5my5+RHWiiSBsWl21PTI5k9vcbCPvRLrS\nyITwKykOeDrC8FO2YBU7JnNeeD2xqto7MEuDdnCBHpC7ZVuueNnYuNvWJ6T+Lf00\nt/ANvO4/AgMBAAECggEARZEyhyueCuLQWPKgz1TqbMzIW9kVaZnDVvq2kgik2/HO\naVg9rm6uCgN3R8yE1QwlaTlkSMEX8kOjOElvbEfRy8hgz6AXRmBKCVx5uySBRpT4\nh2XhwMnV3d4cpWWFiJOKQTxylYOoSgakBZVjrP7IOwdEI9b/t4xjW+h0j53Uf80U\ntBvCxvSPks4ESbyjDvFy7X63vPgF3sWfZDhMDjlYJZCCPEX61mbbW/AGyB10yGKu\nydQWvPBVUy9QlKAQV6MWeUTzjmTJK+g8V7U2Cfs+hBTw8uI/Y3XYtgdF9qhx012d\nDDMLuJFJAyc9+KgKEy1zx6e9xJS8lO2W4/NqmsZSQQKBgQDQl0y1NTTibWeA4oLQ\n7T5nX0zD2Ho9G0zLBWIh78x408QpyC0PZzw6+LlSsQimTtGaVKs0ikZ3bmTFNANW\nTuKQ/o6gGq2p9yXwTmuhTc49Se4GbzrCX3dAE5sTCxBd97PKiv2Sov5Upz66PEKI\n7dGQFf8ppekhlSE1dy3kWqk5rwKBgQDACGoVz2N7+kNIj14z9ohPy2v+oLjLrnCN\ncaymU3YsNtzXuvUaR070+pvbZ+mwoIXSZcgr/OQ7E2aM6bgabrSc3qJeXGfnu45r\nxY6ncPDDf+j+b8Kw+IoV1iKz3JDUN/5DEbOuNtwTuqpAmDXmSAvk+mDyet28jlXT\nqG7gDNMIcQKBgFqNxGRKc+n0euGN9CKFS/kOe0HuYarThjQA40g+VTMDI/7LgxxT\nwecMAVAvwMSKJR5tsWF+wfapOyANY4F9f4hYqkxBKLFHtPWs5bbCE02yIZ4zfXvS\ne++aU1EiFXnlxeyhCFI3ZlgTvvyUmoHdVIPLuNk4yIumtSMD2S1wWlTLAoGAXLBz\nDB3zJfdRHKfez3QSrXlBokDPkbicKRmSPSIR6xt8E0DxZ4K90K9aJVgNyyxgC4MH\nUHwbaYxetmtlapS+5uzrMGKn4Il+H/TWe2mfPK3zt0QYlDUS6aFXVLuEyHpSZusX\ncGKYbYlu/gi6E3H5E8fqnX/CoW2ObcBh7BEkl3ECgYEAxOdXzTfg+Twqr/CAxrC9\nGrifNy84Vg+LmwyyuwhGsMdvo0U4kUjjW7dI0/9RiVxUI7aQxnj0El/uC7vZluSe\n+ItfLlniE7sEhrTglEluAb4nyOm57u2GvjhL9wSLpHAX3hMiBs7h1Vft7GkkTkf0\n9ziLFQ9C8ey47uK8ajdyRDE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-s1icy@ecommerce-8868d.iam.gserviceaccount.com",
        "client_id": "116988058612822353859",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s1icy%40ecommerce-8868d.iam.gserviceaccount.com"
    }
}

export const baseSession = (session({
    store:MongoStore.create({mongoUrl:process.env.MONGO_URL}),
    secret:process.env.SECRET, 
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60000},
}))