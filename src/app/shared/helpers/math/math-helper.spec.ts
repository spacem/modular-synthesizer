import { MathHelper } from './math-helper';

describe( 'MathHelper', () =>
{
	it( 'should create an instance', () =>
	{
		expect( new MathHelper() ).toBeTruthy();
	} );



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// percentToRange
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	it( '::percentToRange(0,0,0)', () =>
	{
		expect( MathHelper.percentToRange(0,0,0) ).toBe(0);
	} );

	it( '::percentToRange(0,0,100)', () =>
	{
		expect( MathHelper.percentToRange(0,0,100) ).toBe(0);
	} );

	it( '::percentToRange(100,0,100)', () =>
	{
		expect( MathHelper.percentToRange(100,0,100) ).toBe(100);
	} );

	it( '::percentToRange(100,0,200)', () =>
	{
		expect( MathHelper.percentToRange(100,0,200) ).toBe(200);
	} );

	it( '::percentToRange(50,0,100)', () =>
	{
		expect( MathHelper.percentToRange(50,0,100) ).toBe(50);
	} );

	it( '::percentToRange(-50,0,100)', () =>
	{
		expect( MathHelper.percentToRange(-50,0,100) ).toBe(-50);
	} );

	it( '::percentToRange(200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(200,0,100) ).toBe(200);
	} );

	it( '::percentToRange(-200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(-200,0,100) ).toBe(-200);
	} );

	it( '::percentToRange(200,0,1000)', () =>
	{
		expect( MathHelper.percentToRange(200,0,1000) ).toBe(2000);
	} );

	it( '::percentToRange(-200,0,1000)', () =>
	{
		expect( MathHelper.percentToRange(-200,0,1000) ).toBe(-2000);
	} );

	it( '::percentToRange(200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(200,0,100) ).toBe(200);
	} );

	it( '::percentToRange(50,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(50,-100,0) ).toBe(-50);
	} );

	it( '::percentToRange(100,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(100,-100,0) ).toBe(0);
	} );

	it( '::percentToRange(200,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(200,-100,0) ).toBe(100);
	} );

	it( '::percentToRange(0,100,0)', () =>
	{
		expect( MathHelper.percentToRange(0,100,0) ).toBe(0);
	} );

	it( '::percentToRange(50,100,0)', () =>
	{
		expect( MathHelper.percentToRange(50,100,0) ).toBe(50);
	} );

	it( '::percentToRange(100,100,0)', () =>
	{
		expect( MathHelper.percentToRange(100,100,0) ).toBe(100);
	} );

	it( '::percentToRange(-200,100,0)', () =>
	{
		expect( MathHelper.percentToRange(-200,100,0) ).toBe(-200);
	} );



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// logarithmicScale
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	it( '::logarithmicScale( 0, 0, 100, 100, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(0,0,100, 100, 10000000) ).toBe(100.00000000000004);
	} );

	it( '::logarithmicScale( 10, 0, 100, 100, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(10,0,100, 100, 10000000) ).toBe(316.22776601683825);
	} );

	it( '::logarithmicScale(20,0,100, 100, 10000000)', () =>
	{
		expect( MathHelper.logarithmicScale(20,0,100, 100, 10000000) ).toBe(1000.0000000000007);
	} );

	it( '::logarithmicScale( 40, 0, 100, 100, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(40,0,100, 100, 10000000) ).toBe(10000.00000000001);
	} );

	it( '::logarithmicScale( 60, 0, 100, 100, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(60,0,100, 100, 10000000) ).toBe(100000.0000000002);
	} );

	it( '::logarithmicScale( 100, 0, 100, 100, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(100,0,100, 100, 10000000) ).toBe(10000000.000000006);
	} );

	it( '::logarithmicScale( 0, 0, 100, 0, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(0,0,100, 0, 10000000) ).toBe(9.999999999999992e-21);
	} );

	it( '::logarithmicScale( 100, 0, 100, 0, 10000000 )', () =>
	{
		expect( MathHelper.logarithmicScale(100,0,100, 0, 10000000) ).toBe(9999999.99999997);
	} );
} );
