import type { GetUserResponse } from '@repo/contracts/users';

import { Suspense, useState } from 'react';

import { Dialog, ErrorBoundary } from '#components/index.ts';
import { Loader } from '#components/ui/index.ts';
import { fetchInternalData } from '#utils/index.ts';

const User = ({ username, bestTime }: GetUserResponse) => (
	<li>
		{username} <time dateTime={bestTime}>{bestTime}</time>
	</li>
);

const renderUser = (props: GetUserResponse) => <User key={crypto.randomUUID()} {...props} />;

export const Leaderboard = () => {
	const [users, setUsers] = useState<GetUserResponse[]>([]);

	const fetchUsers = async () => setUsers(await fetchInternalData<GetUserResponse[]>('users'));

	return (
		<Dialog.Root>
			<Dialog.Trigger>Leaderboard</Dialog.Trigger>
			<Dialog.Window onToggle={fetchUsers}>
				<ErrorBoundary>
					<h1>Leaderboard</h1>
					<Suspense fallback={<Loader />}>
						<ol>{users.map(renderUser)}</ol>
					</Suspense>
				</ErrorBoundary>
				<Dialog.Close>Close</Dialog.Close>
			</Dialog.Window>
		</Dialog.Root>
	);
};
