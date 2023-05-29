
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {query : {id}} = req;
    const post = await client?.post.findUnique({
        where:{
            id : Number(id),
        },
        include:{
            user: {
                select:{
                    id: true, name: true, avatar: true
                }
            },
            _count:{
                select:{
                    answer: true,
                    wondering: true
                }
            },
            answer:{
                select:{
                    answer: true,
                    user: {
                        select:{
                            id: true, name: true, avatar: true
                        }
                    },

                }
            }
        }
    });
    res.json({
        ok: true,
        post
    });
}
export default withApiSession(withHandler({methods: ["GET"], handler}));