import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromCollection from './collection';
import * as fromSearch from './search';
import * as fromToneModules from './tone-module';

export interface ToneModulesState
{
	search:fromSearch.State;
	ToneModules:fromToneModules.State;
	collection:fromCollection.State;
}

export interface State extends fromRoot.State
{
	ToneModules:ToneModulesState;
}

export const reducers = {
	search: fromSearch.reducer,
	ToneModules: fromToneModules.reducer,
	collection: fromCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `ToneModules` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.ToneModulesState$ = state$.pipe(select(getToneModulesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getToneModulesState = createFeatureSelector<ToneModulesState>( 'ToneModules' );

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getBookEntitiesState = createSelector(
	getToneModulesState,
	state => state.ToneModules
);

export const getSelectedBookId = createSelector(
	getBookEntitiesState,
	fromToneModules.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
	selectIds: getBookIds,
	selectEntities: getBookEntities,
	selectAll: getAllToneModules,
	selectTotal: getTotalToneModules,
} = fromToneModules.adapter.getSelectors( getBookEntitiesState );

export const getSelectedBook = createSelector(
	getBookEntities,
	getSelectedBookId,
	( entities, selectedId ) =>
	{
		return selectedId && entities[ selectedId ];
	}
);

/**
 * Just like with the ToneModules selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
	getToneModulesState,
	( state:ToneModulesState ) => state.search
);

export const getSearchBookIds = createSelector(
	getSearchState,
	fromSearch.getIds
);
export const getSearchQuery = createSelector(
	getSearchState,
	fromSearch.getQuery
);
export const getSearchLoading = createSelector(
	getSearchState,
	fromSearch.getLoading
);
export const getSearchError = createSelector(
	getSearchState,
	fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of ToneModules in the store.
 */
export const getSearchResults = createSelector(
	getBookEntities,
	getSearchBookIds,
	( ToneModules, searchIds ) =>
	{
		return searchIds.map( id => ToneModules[ id ] );
	}
);

export const getCollectionState = createSelector(
	getToneModulesState,
	( state:ToneModulesState ) => state.collection
);

export const getCollectionLoaded = createSelector(
	getCollectionState,
	fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
	getCollectionState,
	fromCollection.getLoading
);
export const getCollectionBookIds = createSelector(
	getCollectionState,
	fromCollection.getIds
);

export const getBookCollection = createSelector(
	getBookEntities,
	getCollectionBookIds,
	( entities, ids ) =>
	{
		return ids.map( id => entities[ id ] );
	}
);

export const isSelectedBookInCollection = createSelector(
	getCollectionBookIds,
	getSelectedBookId,
	( ids, selected ) =>
	{
		return ids.indexOf( selected ) > -1;
	}
);
