export default {
	MAX_ATTACHMENT_SIZE: 5000000,
 s3: {
	REGION: "us-east-1",
	BUCKET: "records-app-uploads"
 },
 apiGateway: {
	REGION: "us-east-1",
	URL: "https://urfhjvag1b.execute-api.us-east-1.amazonaws.com/prod"
 },
 cognito: {
	REGION: "us-east-1",
	USER_POOL_ID: "us-east-1_LdpP7wfLy",
	APP_CLIENT_ID: "o3o7rpi7otu51bavjf6d45vfu",
	IDENTITY_POOL_ID: "us-east-1:331583d4-5cf4-4728-9861-39cb38d96129"
 }
};
