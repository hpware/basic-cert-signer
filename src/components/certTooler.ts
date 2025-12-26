import fs from "node:fs";
import { exec, spawn } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const spawnWithInput = (
  cmd: string,
  args: string[],
  input: string
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
  saveUUID: string = crypto.randomUUID(),
  commonName: string,
  organizationUnit: string,
  organization: string,
  locality: string,
  state: string,
  country: string
) {
  try {
    const { stdout: getPrivateKey } = await execAsync(`openssl genrsa 2048`);
    const privateKeySavePath = `./certs/created/${saveUUID}_private_key.pem`;

    await fs.promises.mkdir("./certs/created", { recursive: true });

    await fs.promises.writeFile(privateKeySavePath, getPrivateKey);
    const subj = `/CN=${commonName}/OU=${organizationUnit}/O=${organization}/L=${locality}/ST=${state}/C=${country}`;

    // Using '-' tells OpenSSL to read the key from stdin
    const csr = await spawnWithInput(
      "openssl",
      ["req", "-new", "-key", privateKeySavePath, "-subj", subj],
      privateKeySavePath
    );
    return { csr: csr.stdout, privateKey: privateKeySavePath };
  } catch (e) {
    console.error(`generateCSR failed: ${e}`);
    throw e;
  }
}

export async function generateCertificate(
  csrText: string,
  generateDays: number,
  saveUUID: string = crypto.randomUUID()
) {
  try {
    const termGenerate = await spawnWithInput(
      "openssl",
      [
        "x509",
        "-req",
        "-in",
        "-",
        "-CA",
        "./certs/master.pub.pem",
        "-CAkey",
        "./certs/master.key.pem",
        "-CAcreateserial",
        "-days",
        generateDays.toString(),
        "-sha256",
      ],
      csrText
    );
    const savePath = `./certs/created/${saveUUID}_pub.pem`;

    await fs.promises.mkdir("./certs/created", { recursive: true });

    await fs.promises.writeFile(savePath, termGenerate.stdout);
    return savePath;
  } catch (e) {
    console.error(`generateCertificate failed: ${e}`);
    throw e;
  }
}
