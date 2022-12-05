
import client from "@libs/server/client";
import withHandler, { ResposeType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResposeType>
) {
    const {token} = req.body;
    console.log(token)

    res.status(200).end();
}
export default withHandler("POST", handler)