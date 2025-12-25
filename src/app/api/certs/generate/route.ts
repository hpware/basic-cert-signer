import { NextRequest } from "next/server";
import * as certTool from "@/components/certTooler";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const { mode, Days } = Object.fromEntries(formData);
  if (mode === "simple") {
    const { CN } = Object.fromEntries(formData);
    //const certCSR = generateCSR(CN);
  } else if (mode === "advanced") {
    const { CN, OU, O, L, ST, C } = Object.fromEntries(formData);
    //const certCSR = generateCSR(CN, OU, O, L, ST, C);
  } else if (mode === "submitCSR") {
    const { CSR } = Object.fromEntries(formData);

    const generateCert = await certTool.generateCertificate(CSR as File, Days);
    return new Response(generateCert, { status: 200 });
  }
};
