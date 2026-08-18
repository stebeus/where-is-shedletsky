import { LoaderCircle } from 'lucide-react';

export const Loader = () => (
	<p className="flex not-[dialog>*]:drop-shadow-blue-950 not-[dialog>*]:drop-shadow-xs/25 after:animate-dots">
		<span className="flex gap-1">
			<LoaderCircle className="animate-spin opacity-50" /> Loading
		</span>
	</p>
);
