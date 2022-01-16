// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type VerifiableCredential = any;
import { encryptTo } from "../../../core/encrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  const { recipient, message } = req.body;

  const result = await encryptTo(recipient, message);
  // eJyVUcmSokAU_BfmOG3EiMqgN0EoGxRkKbaJCQOpUoqtq7GUxeh_72L-YG5vy8jMly-Bth8MZwwjYSPgwagu9ZHYxIid8b2DqrEW3oQWZ4QS3LC7sPnzEnKcItwKm5dQkgmFCNqUeNiM0rFkxBs_9XX52SEoByVSzH4lafEYXemtsU5wC8aGkswi4bX5MUoHj8lqiecRkJ4s9ynC5brvpXRlmaN80x7xydkbp9wtrq62VbmUtLpxRk3d7Wea93MrriQz5GNMy3962MC3tnnio6x98joSV6v55KHnDZvDQIvRs3Yk-db6lwUl9DH0Sk7vddAP-OwrIhLXw2MuC1-ciz7-EzRhJtYEVKVdswr7VLLKeYtA5eNGB3bIeiS6ga0nbaIZB7yDvKukECRdIq5sqAeKu6CPDFSFX1dRUi8LXCRHuHCWjsiqY5DvrSb5lepul4CgtaN8adXa3C-ZZAOko6ByIMxNCHIvrRPPhfpucoKbrB0oz_jMc-L60uKQMLOh-n1JZ5EZLKwUnhdX3Y49r24dUfntEDVRo359yKL7-2ytAk1zhK-_bwKZ_L1vSTUEIUDKYACpKHY9MC5jHfi-GKry7Tq9n9Actwz3jN-bVjbIjdR18XDedaahqh46P4_8jKVTnrvM04KjnGUyrEUgfrg3G1Sc7xuxntux
  try {
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
