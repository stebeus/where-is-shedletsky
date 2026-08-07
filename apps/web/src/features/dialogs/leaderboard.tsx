import type { GetUserRequest } from '@repo/contracts/users';

import { createResource, ErrorBoundary, For, Suspense } from 'solid-js';

import { Dialog, renderErrorFallback } from '#components/index.ts';
import { Button, Loader } from '#components/ui/index.ts';
import { fetchInternalData } from '#utils/index.ts';

const fetchUsers = async () => await fetchInternalData<GetUserRequest[]>('users');

const User = (props: GetUserRequest) => (
	<li>
		{props.username} <time dateTime={props.bestTime}>{props.bestTime}</time>
	</li>
);

const renderUser = (props: GetUserRequest) => <User {...props} />;

export const Leaderboard = () => {
	const [users, { refetch }] = createResource(fetchUsers);

	return (
		<Dialog.Root>
			<Dialog.Trigger>Leaderboard</Dialog.Trigger>
			<Dialog.Window>
				<ErrorBoundary fallback={renderErrorFallback}>
					<h1>Leaderboard</h1>
					<Suspense fallback={<Loader />}>
						<ol>
							<For each={users()}>{renderUser}</For>
						</ol>
						<Button onClick={refetch}>Reload</Button>
					</Suspense>
				</ErrorBoundary>
				<Dialog.Close>Close</Dialog.Close>
			</Dialog.Window>
		</Dialog.Root>
	);
};
