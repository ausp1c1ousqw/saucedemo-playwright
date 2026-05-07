import { logger } from "../framework/logger";

export async function beforeEachHook({ page }, testInfo) {
	logger.info(`Starting test: ${testInfo.title}`);
}

export async function afterEachHook({ page }, testInfo) {
	if (testInfo.status !== testInfo.expectedStatus) {
		logger.error(testInfo.error);
	}
	logger.info(`Finished test: ${testInfo.title}`);
}
