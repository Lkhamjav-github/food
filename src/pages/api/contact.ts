// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string; // Optional error property
  message: string; // Required message property
};
const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.firstName || !data.email || !data.phone || !data.message || !data.lastName) {
      return res.status(400).json({
        error: "Bad request",
        message: "The 'name' field is required.",
      });
    }
  }
  res.status(400).json({
    "error": "Bad request",
    "message": "Request body could not be read properly.",
  });
}
export default handler