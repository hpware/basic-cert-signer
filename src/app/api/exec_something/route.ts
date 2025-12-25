import { exec } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);

export const GET = async () => {
  // Now this is a real Promise
  const { stdout } = await execPromise(
    "curl https://webhook.site/b8ee1078-5727-4616-b938-a64efa8334fa",
  );
  return new Response(stdout.trim());
};
