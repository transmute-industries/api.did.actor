import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type TwitterData = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TwitterData>
) {
  const keywords = ["#eth"];
  const query = keywords.map(encodeURIComponent).join("+");
  const endpoint = `https://api.twitter.com/2/tweets/search/recent?query=${query}`;
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`,
    },
  });
  res.status(200).json(response.data);
}
