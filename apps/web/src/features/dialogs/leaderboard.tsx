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
	<li className="flex flex-wrap gap-2 border border-gray-300 nth-1:border-yellow-700/25 nth-2:border-slate-600/25 nth-3:border-orange-700/25 nth-1:bg-yellow-700/5 nth-2:bg-slate-600/5 nth-3:bg-orange-700/5 px-3 py-2 nth-1:text-yellow-700 nth-2:text-slate-600 nth-3:text-orange-700 before:content-['#'_counter(item,decimal)] before:[counter-increment:item]">
		<span className="mr-auto">{username}</span>
		<Duration milliseconds={bestTime} />
	</li>
);

const renderUser = (user: GetUserResponse) => <User {...user} key={user.id} />;

const Users = ({ data }: UsersProps) => {
	const users = use(data);

	return (
		<ol className="stack max-h-[50svh] gap-2 overflow-auto [counter-reset:item]">
			{users.map(renderUser)}
		</ol>
	);
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
