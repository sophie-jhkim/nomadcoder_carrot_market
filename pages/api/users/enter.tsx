import twilio from "twilio";
import mail from "@sendgrid/mail";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {phone, email} = req.body;
    const user = phone? {phone: +phone} : email? {email} : null;
    if(!user) return res.status(400).json({ok:false});
    const payload = Math.floor(100000 + Math.random()*900000) + "";
    const token = await client.token.create({
        data :{
            payload,
            user : {
                connectOrCreate: {
                    where:{
                        ...user
                    },
                    create:{
                        name: "Anonymous",
                        ...user
                    },
                }
            }
            
        }
    });
/*   if(email){
        user = await client.user.findUnique({
            where : {
                email
            }
        });
        if(!user){
            user = await client.user.create({
                data:{
                    name: "Anonymous",
                    email,
                }
            })
        }
    } */
    if(phone){
    /*     const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            to: process.env.MY_PHONE!,
            body: `your login token is ${payload}.`
        });
        console.log(message)*/
    }else if(email){
        /* const email = await mail.send({
            from : "creatorsophie@gmail.com",
            to : "youwillstay@naver.com",
            subject : "Your Carrot Market Verification Email",
            text: `Your Token is ${payload}`,
            html: `<strong>Your Token is ${payload}</strong>` // 이런식으로 넣는 것도 가능
        }); 
        console.log(email) */
    }
    return res.json({ok:true});
}
export default withHandler({methods: ["POST"], handler, isPrivate:false})