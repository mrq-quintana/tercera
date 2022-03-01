import twilio from "twilio"

const sid = "AC5f4589627f4425931f00984a6f308661";
const token ="523f8c60821fff9c704f9c09fe717db3";
const client = twilio(sid,token);

export async function smsing(){
    try{
        const message = await client.messages.create({
            body:"Hola esto es un sms de prueba de Maxi Quintana",
            from:"+19105971760",
            to:"+541150123519"
        })
        console.log(message);
        return ({message: "Mensaje de texto enviado",result: message});
    }catch(error){
        console.log(error);
        return ({message: "Error al enviar sms",error: error});
    }
};