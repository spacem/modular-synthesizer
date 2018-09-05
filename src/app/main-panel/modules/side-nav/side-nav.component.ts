import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToneModule } from '../../../core/model/tone-module/tone-module';
import * as collection from '../../../core/ngrx/tone-module/actions/collection';
import * as fromToneModules from '../../../core/ngrx/tone-module/reducers/';

@Component( {
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: [ './side-nav.component.scss' ]
} )
export class SideNavComponent implements OnInit
{

	@Output() add = new EventEmitter<ToneModule>();

	constructor(private store: Store<fromToneModules.State>){}

	ngOnInit()
	{

	}

	addToCollection( toneModule:ToneModule )
	{
		this.store.dispatch( new collection.AddToneModule( toneModule ) );
	}

	removeFromCollection( toneModule:ToneModule )
	{
		this.store.dispatch( new collection.RemoveToneModule( toneModule ) );
	}
}
