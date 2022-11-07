import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@upstash/qstash";
import { verifyBody } from "@/lib/validation";

const c = new Client({
  token: process.env.QSTASH_TOKEN!,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const body = verifyBody(JSON.parse(req.body)); // { text: string }
        const result = await c.publishJSON({
          topic: "notifications",
          body,
        });
        return res.status(200).end(result.messageId);
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).end(err);
  }
}

export default handler;
