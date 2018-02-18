import { Action } from '@ngrx/store';
import { ToneModule } from '../../../tone-module/tone-module';

export enum ToneModuleActionTypes {
  Search = '[ToneModule] Search',
  SearchComplete = '[ToneModule] Search Complete',
  SearchError = '[ToneModule] Search Error',
  Load = '[ToneModule] Load',
  Select = '[ToneModule] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handToneModule/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = ToneModuleActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = ToneModuleActionTypes.SearchComplete;

  constructor(public payload: ToneModule[]) {}
}

export class SearchError implements Action {
  readonly type = ToneModuleActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = ToneModuleActionTypes.Load;

  constructor(public payload: ToneModule) {}
}

export class Select implements Action {
  readonly type = ToneModuleActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ToneModuleActions = Search | SearchComplete | SearchError | Load | Select;
