import { NextRequest } from "next/server";
import fs from "node:fs";

export const GET = async (request: NextRequest) => {
  try {
    const params = new URLSearchParams(request.url.split("?")[1]);
    const get = params.get("get");
    const getText = await fs.promises.readFile(
      "./certs/master.pub.pem",
      "utf8",
    );
    if (get === "download") {
      return new Response(getText, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition":
            "attachment; filename=bunCRR_master_pubkey.pem",
        },
      });
    }
    return new Response(getText, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 500 });
  }
};
