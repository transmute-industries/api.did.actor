// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { WithApiBearerAuthRequired } from "../../../components/withApiBearerAuthRequired";

export default WithApiBearerAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(501).json({ error: "not yet implemented" });
});