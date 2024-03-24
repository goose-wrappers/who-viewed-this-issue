import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Box, Inline, Stack, Strong, Text, User, UserGroup, xcss} from '@forge/react';
import {invoke} from '@forge/bridge';
import {DoubleCheckmark} from "./double-checkmark";

interface IssueViewer {
	accountId: string;
	viewedAt: number;
}

const App = () => {

	const REFRESH_INTERVAL = 1000 * 60; // 1 minute
	const JUST_NOW_THRESHOLD = 1000 * 60 * 2; // 2 minutes
	const MINUTES_AGO_THRESHOLD = 1000 * 60 * 60; // 1 hour
	const HOURS_AGO_THRESHOLD = 1000 * 60 * 60 * 12; // 12 hours

	const [viewers, setViewers] = useState<Array<IssueViewer>>([]);
	const [watchingNow, setWatchingNow] = useState<Array<IssueViewer>>([]);

	useEffect(() => {

		const refreshData = () => {
			invoke<Array<IssueViewer>>('getViewers', {touch: true}).then(value => {
				setViewers(value);

				const now = +new Date();
				const watchingNow = value.filter(viewer => now - viewer.viewedAt < JUST_NOW_THRESHOLD);
				setWatchingNow(watchingNow);
			});
		};

		refreshData();

		const interval = setInterval(refreshData, REFRESH_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const timestampToDisplayString = (timestamp: number): string => {
		const now = +new Date();
		const diff = now - timestamp;
		if (diff < JUST_NOW_THRESHOLD) {
			return 'just now';
		} else if (diff < MINUTES_AGO_THRESHOLD) {
			const minutes = Math.floor(diff / (1000 * 60));
			return `${minutes} minutes ago`;
		} else if (diff < HOURS_AGO_THRESHOLD) {
			const hours = Math.floor(diff / (1000 * 60 * 60));
			return `${hours} hours ago`;
		} else {
			return formatTimestampToCustomString(timestamp);
		}
	}

	const formatTimestampToCustomString = (timestamp: number): string => {
		const date = new Date(timestamp);
		return formatDateToCustomString(date);
	}

	const formatDateToCustomString = (date: Date): string => {
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		let hour = date.getHours();
		const minute = date.getMinutes();
		const ampm = hour >= 12 ? 'PM' : 'AM';

		hour = hour % 12;
		hour = hour ? hour : 12; // the hour '0' should be '12'
		const minuteFormatted = minute < 10 ? '0' + minute : minute;

		return `${monthNames[monthIndex]} ${day}, ${year} at ${hour}:${minuteFormatted} ${ampm}`;
	}

	const LastViewedItem = ({viewer}: { viewer: IssueViewer }) => {
		return (
			<Inline>
				<Box xcss={xcss({width: "32px"})}>
					<User accountId={viewer.accountId}/>
				</Box>
				<Box xcss={xcss({paddingLeft: 'space.200'})}>
					<Stack>
						<Inline space="space.0">
							<Text>
								<Strong>
									<User accountId={viewer.accountId}/>
								</Strong>
							</Text>
							<DoubleCheckmark/>
						</Inline>
						<Box xcss={xcss({color: "color.text.subtle"})}>
							<Text>
								Last seen: {timestampToDisplayString(viewer.viewedAt)}
							</Text>
						</Box>
					</Stack>
				</Box>
			</Inline>
		)
	}

	return (
		<>
			{watchingNow.length > 0 &&
				<>
					<Box xcss={xcss({paddingBottom: "space.200"})}>
						<Box xcss={xcss({paddingBottom: "space.200"})}>
							<Text>
								<Strong>
									Watching now:
								</Strong>
							</Text>
						</Box>
						<UserGroup>
							{watchingNow.map((viewer) => (
								<User accountId={viewer.accountId}/>
							))}
						</UserGroup>
					</Box>
				</>
			}

			{viewers.length > 0 &&
				<>
					<Box xcss={xcss({paddingBottom: "space.200"})}>
						<Text>
							<Strong>
								Last viewed:
							</Strong>
						</Text>
					</Box>
					<Box>
						{viewers.map((viewer) => (
							<LastViewedItem viewer={viewer}/>
						))}
					</Box>
				</>
			}
		</>
	);
};

ForgeReconciler.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

