import {storage} from "@forge/api";
import {IssueViewers} from "./issue-viewers";

interface GetViewersPayload {
	call: {
		functionKey: "getViewers",
		payload?: {
			touch?: boolean,
		},
	},
	context: {
		accountId: string,
		extension: {
			issue: {
				key: string;
			},
		},
	},
}

export const handler = async (event: GetViewersPayload) => {
	// console.log("Handling callback: " + JSON.stringify(event, null, 4));

	const issueKey = event.context.extension.issue.key;

	if (event.call.payload && event.call.payload.touch) {
		// add the current viewer to the list before returning
		if (event.context.accountId) {
			const accountId = event.context.accountId;
			const response = await storage.get("view-" + issueKey);
			const viewers = (response || []) as Array<IssueViewers>;
			const filteredViewers = viewers.filter(viewer => viewer.accountId !== accountId);
			const updatedViewers = [{accountId: accountId, viewedAt: Date.now()}, ...filteredViewers];
			await storage.set("view-" + issueKey, updatedViewers);
			return updatedViewers;
		}
	}

	return await storage.get("view-" + issueKey);
};
