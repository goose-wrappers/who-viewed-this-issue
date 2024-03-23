export interface EventPayload {
	user: {
		accountId: string;
	};
	eventType: string;
	issue: {
		key: string;
	};
}
