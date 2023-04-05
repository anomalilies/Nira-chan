import fs from "node:fs/promises";
import path from "node:path";

const fileFilter = (file: string) => file.endsWith(".js") || file.endsWith(".ts");

export async function loadModules<T>(dirname: string): Promise<T[]> {
  const dirPath = path.join(__dirname, dirname);
  const files = (await fs.readdir(dirPath)).filter(fileFilter);
  const paths = files.map((file) => path.join(dirPath, file));

  const modules = await Promise.all(paths.map((file) => import(file)));
  return modules.map((module) => module.default);
}
