import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideNavComponent } from './side-nav.component';

@NgModule( {
	imports: [
		CommonModule
	],
	exports: [SideNavComponent],
	declarations: [ SideNavComponent ]
} )
export class SideNavModule
{
}
