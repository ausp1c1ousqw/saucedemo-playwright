import { getTimestampedDir } from "./getTimestampedDir.js";

const debugDir = "./artifacts";
export function createDebugDirForRun() {
	if (!process.env.DEBUG_DIR) {
		process.env.DEBUG_DIR = getTimestampedDir(debugDir);
	}
	return process.env.DEBUG_DIR;
}
