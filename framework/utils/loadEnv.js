import dotenv from "dotenv";
import path from "path";

export function loadEnv(envFileName) {
  dotenv.config({ path: path.resolve(process.cwd(), envFileName) });
}
