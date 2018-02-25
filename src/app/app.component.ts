import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../app/core/ngrx/reducers';
import * as layout from '../app/core/ngrx/actions/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{

	showSidenav$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>)
	{
		/**
		 * Selectors can be applied with the `select` operator which passes the state
		 * tree to the provided selector
		 */
		this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
	}

	closeSidenav() {
		/**
		 * All state updates are handled through dispatched actions in 'container'
		 * components. This provides a clear, reproducible history of state
		 * updates and user interaction through the life of our
		 * application.
		 */
		this.store.dispatch(new layout.CloseSidenav());
	}

	openSidenav() {
		this.store.dispatch(new layout.OpenSidenav());
	}

}
