import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const { mode } = Object.fromEntries(formData);
  if (mode === "simple") {
    const { CN } = Object.fromEntries(formData);
    //const certCSR = generateCSR(CN);
  }
};
