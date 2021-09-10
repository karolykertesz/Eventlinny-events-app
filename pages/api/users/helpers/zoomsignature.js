import { ESRCH } from "constants";
import crypto from "crypto";
const genSignature = (apiKey, apiSecret, meetingNumber, role) => {
  const timestamp = new Date.now() - 30000;
  const message = Buffer.from(
    apiKey + meetingNumber + timestamp + role
  ).toString("base64");
  const hash = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("base64");
  const signature = Buffer.from(
    `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");
  return signature;
};
const handler = (req, res) => {
  if (req.method === "POST") {
    const { meetingNumber, role } = req.body;
    if (typeof meetingNumber !== "string" || typeof role !== "string") {
      return res.status(403).json({
        message: "I'm sorry something went wrong!!",
      });
    }
    const signature = genSignature(
      process.env.NEXT_PUBLIC_ZOOM_KEY,
      process.env.NEXT_PUBLIC_ZOOM_SECRET,
      meetingNumber,
      parseInt(role)
    );
    return res.status(200).json(signature);
  }
  return res.status(400).json({
    message: "Wrong Request",
  });
};
export default handler;
