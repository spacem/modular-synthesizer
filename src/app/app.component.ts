import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../app/core/ngrx/reducers';
import * as layout from '../app/core/ngrx/actions/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./hamburgers.scss']
})
export class AppComponent
{

	showSidenav$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>)
	{
		this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
	}

	closeSidenav() {
		this.store.dispatch(new layout.CloseSidenav());
	}

	openSidenav() {
		this.store.dispatch(new layout.OpenSidenav());
	}

	addToneModule()
	{

	}

	removeToneModule()
	{

	}
}
