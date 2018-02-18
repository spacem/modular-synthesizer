import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import * as Tone from 'tone';

/**
 * @see https://tonejs.github.io/examples/#analysis
 */
@Component( {
	selector: 'app-waveform-visualizer',
	templateUrl: './waveform-visualizer.component.html',
	styleUrls: [ './waveform-visualizer.component.scss' ]
} )
export class WaveformVisualizerComponent implements AfterViewInit
{
	public waveform = new Tone.Waveform( 1024 );
	private waveformGradient:CanvasGradient;
	private waveformContext:CanvasRenderingContext2D;
	private canvasWidth:number = 320;
	private canvasHeight:number = 200;

	@ViewChild('waveform') canvasRef:ElementRef;
	private running:boolean = true;

	constructor( private ngZone:NgZone){}

	ngAfterViewInit()
	{
		this.waveformContext = this.canvasRef.nativeElement.getContext('2d');

		//make the gradient
		this.waveformGradient = this.waveformContext.createLinearGradient( 0, 0, this.canvasWidth, this.canvasHeight );
		this.waveformGradient.addColorStop( 0, '#ddd' );
		this.waveformGradient.addColorStop( 1, '#000' );

		this.paint();
	}

	drawWaveform( values )
	{
		this.waveformContext.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
		this.waveformContext.beginPath();
		this.waveformContext.lineJoin = 'round';
		this.waveformContext.lineWidth = 1;
		this.waveformContext.strokeStyle = this.waveformGradient;
		values.forEach( (value, i) =>
		{
			const val = ( value + 1 ) / 2;
			const x = this.canvasWidth * ( i / values.length );
			const y = val * this.canvasHeight;

			if( i === 0 )
				this.waveformContext.moveTo( x, y );
			else
				this.waveformContext.lineTo( x, y );
		});
		this.waveformContext.stroke();
	}

	private paint()
	{
		if( !this.running )
			return;

		// Get the waveform values and draw it.
		const waveformValues = this.waveform.getValue();
		this.drawWaveform( waveformValues );

		// Schedule next paint but outside zone.js (not using the requestAnimationFrame monkey patch).
		//FIXME It does not seem to work as expected so wait for Zone.js next versions @see https://github.com/angular/zone.js/issues/875 and https://github.com/angular/angular/issues/8804
		//this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => this.paint() ));

		// We're out Zone.js the bad way, but it works!
		window['__zone_symbol__requestAnimationFrame'](() => this.paint() );
	}
}
