import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Box, Text, User, UserGroup} from '@forge/react';
import {invoke} from '@forge/bridge';

interface IssueViewer {
	accountId: string;
	viewedAt: number;
}

const App = () => {
	const [data, setData] = useState<Array<IssueViewer>>([]);
	useEffect(() => {
		invoke<Array<IssueViewer>>('getViewers', {example: ''}).then(value => {
			console.log("GOT RESPONSE");
			console.dir(value);
			setData(value);
		});
	}, []);

	return (
		<>
			<Text>Watching now:</Text>
			<UserGroup>
				{data.map((viewer) => (
					<User accountId={viewer.accountId}/>
				))}
			</UserGroup>

			<Text>Last viewed:</Text>
			<Box>
				{data.map((viewer) => (
					<Box>
						<User accountId={viewer.accountId}/>
						Seen: {new Date(viewer.viewedAt).toLocaleString()}
					</Box>
				))}
			</Box>
		</>
	);
};

ForgeReconciler.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);
