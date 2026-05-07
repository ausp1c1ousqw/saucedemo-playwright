import path from "path";
import { ensureDirExists } from "./ensureDirExists.js";

export function getTimestampedDir(parentFolder) {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");

	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	const folderName = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
	const dir = path.join(parentFolder, folderName);
	return ensureDirExists(dir);
}
