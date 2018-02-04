import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

		//get the waveform values and draw it
		const waveformValues = this.waveform.getValue();
		this.drawWaveform( waveformValues );

		// Schedule next paint
		requestAnimationFrame(() => this.paint() );
	}
}
