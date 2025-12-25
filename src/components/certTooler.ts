import fs from "node:fs";
import { exec, spawn } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const spawnWithInput = (
  cmd: string,
  args: string[],
  input: string,
): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data: any) => (stdout += data));
    child.stderr.on("data", (data: any) => (stderr += data));

    child.on("close", (code: any) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      } else {
        resolve({ stdout, stderr });
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
};

export async function generateCSR(
  commonName: string,
  organizationUnit: string = "BunCCR",
  organization: string = "BunCCR",
  locality: string = "Da-an District",
  state: string = "Taipei City",
  country: string = "TW",
) {
  try {
    const { stdout: getPrivateKey } = await execAsync(`openssl genrsa 2048`);
    const subj = `/CN=${commonName}/OU=${organizationUnit}/O=${organization}/L=${locality}/ST=${state}/C=${country}`;

    // Using '-' tells OpenSSL to read the key from stdin
    const csr = await spawnWithInput(
      "openssl",
      ["req", "-new", "-key", "-", "-subj", subj],
      getPrivateKey,
    );
    return csr.stdout;
  } catch (e) {
    console.error(`generateCSR failed: ${e}`);
    throw e;
  }
}

export async function generateCertificate(
  csrString: File,
  generateDays: number,
) {
  try {
    const csrText = await csrString.text();
    const termGenerate = await spawnWithInput(
      "openssl",
      [
        "x509",
        "-req",
        "-in",
        "-",
        "-CA",
        "./certs/slave.pub.pem",
        "-CAkey",
        "./certs/slave.key.pem",
        "-CAcreateserial",
        "-days",
        generateDays.toString(),
        "-sha256",
      ],
      csrText,
    );
    return termGenerate.stdout;
  } catch (e) {
    console.error(`generateCertificate failed: ${e}`);
    throw e;
  }
}
