import {storage} from '@forge/api';

interface Payload {
	user: {
		accountId: string;
	};
	eventType: string;
	issue: {
		key: string;
	};
}

interface IssueViewers {
	accountId: string;
	viewedAt: number;
}

export const handler = async (payload: Payload, context: any) => {

	const accountId = payload.user.accountId;
	const eventType = payload.eventType;
	if (eventType !== "avi:jira:viewed:issue") {
		return;
	}

	const issueKey = payload.issue.key;
	// console.log("Event triggered for issue with: ", JSON.stringify(payload));
	console.log("Viewing issue: ", issueKey, " by user: ", accountId, " with event type: ", eventType);

	const response = await storage.get("view-" + issueKey);
	if (response == null) {
		const viewers = [{accountId: accountId, viewedAt: Date.now()}];
		await storage.set("view-" + issueKey, viewers);
	} else {
		const viewers = response as Array<IssueViewers>;
		if (viewers.find(viewer => viewer.accountId === accountId) == null) {
			viewers.push({accountId: accountId, viewedAt: Date.now()});
			await storage.set("view-" + issueKey, viewers);
		}
	}
};
