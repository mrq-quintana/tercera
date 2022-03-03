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

export async function mailing(mail){
    try {
        const result = await transport.sendMail(mail)
        return ({message: "Revise su bandeja de mail",result: result});
    }catch(error){
        console.log(error);
        return ({message: "Error al enviar mail",error: error});
    }
};