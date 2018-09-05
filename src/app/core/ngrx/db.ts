import { DBSchema } from '@ngrx/db';

export const ngrxDbSchema:DBSchema =
{
	version: 1,
	name: 'modular-synthesizer',
	stores: {
		toneModules: {
			autoIncrement: true,
			primaryKey: 'id',
		},
	},
};
