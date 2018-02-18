import { Action } from '@ngrx/store';
import { ToneModule } from '../../../model/tone-module/tone-module';


export enum CollectionActionTypes
{
	AddToneModule = '[Collection] Add ToneModule',
	AddToneModuleSuccess = '[Collection] Add ToneModule Success',
	AddToneModuleFail = '[Collection] Add ToneModule Fail',
	RemoveToneModule = '[Collection] Remove ToneModule',
	RemoveToneModuleSuccess = '[Collection] Remove ToneModule Success',
	RemoveToneModuleFail = '[Collection] Remove ToneModule Fail',
	Load = '[Collection] Load',
	LoadSuccess = '[Collection] Load Success',
	LoadFail = '[Collection] Load Fail',
}

/**
 * Add ToneModule to Collection Actions
 */
export class AddToneModule implements Action
{
	readonly type = CollectionActionTypes.AddToneModule;

	constructor( public payload:ToneModule ){}
}

export class AddToneModuleSuccess implements Action
{
	readonly type = CollectionActionTypes.AddToneModuleSuccess;

	constructor( public payload:ToneModule ){}
}

export class AddToneModuleFail implements Action
{
	readonly type = CollectionActionTypes.AddToneModuleFail;

	constructor( public payload:ToneModule ){}
}

/**
 * Remove ToneModule from Collection Actions
 */
export class RemoveToneModule implements Action
{
	readonly type = CollectionActionTypes.RemoveToneModule;

	constructor( public payload:ToneModule ){}
}

export class RemoveToneModuleSuccess implements Action
{
	readonly type = CollectionActionTypes.RemoveToneModuleSuccess;

	constructor( public payload:ToneModule ){}
}

export class RemoveToneModuleFail implements Action
{
	readonly type = CollectionActionTypes.RemoveToneModuleFail;

	constructor( public payload:ToneModule ){}
}

/**
 * Load Collection Actions
 */
export class Load implements Action
{
	readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action
{
	readonly type = CollectionActionTypes.LoadSuccess;

	constructor( public payload:ToneModule[] ){}
}

export class LoadFail implements Action
{
	readonly type = CollectionActionTypes.LoadFail;

	constructor( public payload:any ){}
}

export type CollectionActions =
	| AddToneModule
	| AddToneModuleSuccess
	| AddToneModuleFail
	| RemoveToneModule
	| RemoveToneModuleSuccess
	| RemoveToneModuleFail
	| Load
	| LoadSuccess
	| LoadFail;
