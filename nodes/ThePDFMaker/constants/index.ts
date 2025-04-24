// const ENV = 'PROD'; // "DEV" or "PROD"
const ENV = 'DEV';

const CONSTANTS = {
	PROD: {
		BASE_URL: 'https://api.thepdfmaker.com/',
		DASHBOARD_URL: 'https://app.thepdfmaker.com/',
	},
	DEV: {
		BASE_URL: 'http://localhost:8080/',
		DASHBOARD_URL: 'http://localhost:4001/',
	},
};

export const BASE_URL = CONSTANTS[ENV].BASE_URL;
export const DASHBOARD_URL = CONSTANTS[ENV].DASHBOARD_URL;
