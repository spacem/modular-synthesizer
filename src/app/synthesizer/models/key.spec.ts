import {Key} from './key';
import {Note} from './note';

describe('Key', () =>
{
	it('should create an instance', () =>
	{
		expect(new Key(new Note(), 0)).toBeTruthy();
	});
});
