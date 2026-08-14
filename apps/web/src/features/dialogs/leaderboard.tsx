import type { GetUserResponse } from '@repo/contracts/users';

import { Suspense, use, useState } from 'react';

import { Dialog, ErrorBoundary } from '#components/index.ts';
import { Duration, Loader } from '#components/ui/index.ts';
import { fetchData } from '#utils/fetch.ts';

type UsersPromise = Promise<GetUserResponse[]>;

type UsersProps = {
	data: UsersPromise;
};

const fetchUsers = () => fetchData<GetUserResponse[]>('users');

const User = ({ username, bestTime }: GetUserResponse) => (
	<li>
		{username} <Duration milliseconds={bestTime} format={{ style: 'narrow' }} />
	</li>
);

const renderUser = (props: GetUserResponse) => <User {...props} key={crypto.randomUUID()} />;

const Users = ({ data }: UsersProps) => {
	const users = use(data);
	return <ol>{users.map(renderUser)}</ol>;
};

export const Leaderboard = () => {
	const [users, setUsers] = useState<UsersPromise>(fetchUsers());

	return (
		<Dialog.Root>
			<Dialog.Trigger>Leaderboard</Dialog.Trigger>
			<Dialog.Window onToggle={() => setUsers(fetchUsers())}>
				<ErrorBoundary>
					<h1>Leaderboard</h1>
					<Suspense fallback={<Loader />}>
						<Users data={users} />
					</Suspense>
				</ErrorBoundary>
				<Dialog.Close>Close</Dialog.Close>
			</Dialog.Window>
		</Dialog.Root>
	);
};
