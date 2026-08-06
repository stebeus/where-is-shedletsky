import { describe, expect, it } from 'vitest';

import { parsePosition } from './helpers.js';

describe('parsePosition', () => {
	it('parses strings into a position object', () => {
		expect(parsePosition('0,0')).toStrictEqual({ x: 0, y: 0 });
	});
});
