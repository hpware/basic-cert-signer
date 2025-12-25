import fs from "node:fs";

export const GET = async () => {
  const getText = await fs.promises.readFile("./certs/master.pub.pem", "utf8");
  return new Response(getText);
};
