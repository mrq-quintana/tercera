import twilio from "twilio";

const sid = "AC5f4589627f4425931f00984a6f308661";
const token ="523f8c60821fff9c704f9c09fe717db3";
const client = twilio(sid,token);

export async function wsping(){
    try{
        const message = await client.messages.create({
            body:"Hola esto es un whatsApp de prueba de Maxi Quintana",
            from:"whatsapp:+14155238886",
            to:"whatsapp:+5491150123519",
            // mediaUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZe8xjSlSEI8a1SK92Jay9sPqJXumdLkVAAg&usqp=CAU"
        })
        console.log(message);
        return ({message: "Mensaje de whatsapp enviado",result: message});
    }catch(error){
        console.log(error);
        return ({message: "Error al enviar whatsapp",error: error});
    }
};