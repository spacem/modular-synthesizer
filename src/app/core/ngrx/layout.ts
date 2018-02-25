import { LayoutActions, LayoutActionTypes } from './actions/layout';

export interface MainState
{
	showSidenav:boolean;
}

const initialState:MainState = {
	showSidenav: false,
};

export function reducer( state:MainState = initialState, action:LayoutActions ):MainState
{
	switch( action.type )
	{
		case LayoutActionTypes.CloseSidenav:
			return {
				showSidenav: false,
			};

		case LayoutActionTypes.OpenSidenav:
			return {
				showSidenav: true,
			};

		default:
			return state;
	}
}

export const getShowSidenav = ( state:MainState ) => state.showSidenav;
