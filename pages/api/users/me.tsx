
import client from "@libs/server/client";
import withHandler, { ResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResposeType>
) {
    console.log(req.session.user);
    const profile = await client.user.findUnique({
        where : {id : req.session.user?.id}
    });
    res.json({
        ok: true,
        profile
    });
}
export default withApiSession(withHandler({method: "GET", handler}));