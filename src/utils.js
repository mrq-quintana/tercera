import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authAdmin = (req,res,next)=>{
    if (!req.auth)
    res.status(403).send({error:-2,message:"Usuario no autorizado"})
    else next();
}
export default __dirname; 

export const passwordBcrypt = password =>bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const passwordNoBcrypt =(user,password)=>bcrypt.compareSync(password,user.password)

