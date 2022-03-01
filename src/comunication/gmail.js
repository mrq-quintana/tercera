import {createTransport} from "nodemailer"

const appPwdGmail = "vsbprnwvbhxqzehr"

const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'mrq.quintana@gmail.com',
        pass: appPwdGmail
    }
});
const mail ={
    from:"Confirmacion de registro <mail>",
    to:"maximiliano.quintana@eboxsa.com.ar",
    subject: "Registro correcto",
    html:`<h1 style="color:blue;"> Bienvenido </h1>`
}

export async function mailing(){
    try {
        const result = await transport.sendMail(mail)
        console.log(result);
        return ({message: "Revise su bandeja de mail",result: result});
    }catch(error){
        console.log(error);
        return ({message: "Error al enviar mail",error: error});
    }
};