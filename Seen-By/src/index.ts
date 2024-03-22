import {storage} from "@forge/api";

export const handler = async (payload: any, context: any) => {
	console.log("got view" + JSON.stringify(payload, null, 4));

	const issueKey = payload.context.extension.issue.key;
	console.log("Viewing issue " + issueKey);

	const response = await storage.get("view-" + issueKey);
	return response;
};
