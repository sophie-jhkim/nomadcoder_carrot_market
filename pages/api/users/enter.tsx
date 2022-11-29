import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {phone, email} = req.body;
    const payload = phone? {phone: +phone} : {email}
    const user = await client.user.upsert({
        where:{
            ...payload
        },
        create:{
            name: "Anonymous",
            ...payload
        },
        update:{},
    })
    console.log(user)
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
    console.log(req.body);
    res.json({ok: true});
}
export default withHandler("POST", handler)