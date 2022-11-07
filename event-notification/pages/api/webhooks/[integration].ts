import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import { notify } from "@/lib/webhooks";
import { verifyBody, verifyIntegration } from "@/lib/validation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const integration = verifyIntegration(req.query.integration);
    const body = verifyBody(req.body); // verifySignature returns { body: JSON.parse(req.body) }
    const result = await notify(integration, body.text);
    if (!result.ok) {
      return res.status(500).end(`Problem with ${integration}`);
    }
    return res.status(201).json({ integration });
  } catch (e) {
    return res.status(500).end(e);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default verifySignature(handler);
