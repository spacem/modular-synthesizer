import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MainPanelService
{

	private toneSource = new Subject<number>();
	public toneSource$ = this.toneSource.asObservable();

	setTone( tone:number ):void
	{
		this.toneSource.next(tone);
	}
}
