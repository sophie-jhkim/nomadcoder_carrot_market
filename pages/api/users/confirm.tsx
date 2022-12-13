
import client from "@libs/server/client";
import withHandler, { ResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResposeType>
) {
    const {token} = req.body;
    const foundToken = await client.token.findUnique({
        where:{
            payload : token,
        },
        // include:{user:true} user정보도 가져올 수 있음
    })
    if(!foundToken) return res.status(404).end();
    req.session.user = {
        id : foundToken.userId
    }
    await req.session.save();
    await client.token.deleteMany({
        where :{
            userId : foundToken.userId
        }
    })
    res.json({ok:true});
}
export default withApiSession(withHandler({method: "POST",handler}));