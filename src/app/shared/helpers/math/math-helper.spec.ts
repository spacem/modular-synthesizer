import { MathHelper } from './math-helper';

describe( 'MathHelper', () =>
{
	it( 'should create an instance', () =>
	{
		expect( new MathHelper() ).toBeTruthy();
	} );

	it( '::percentToRange should be 0 when (0,0,0)', () =>
	{
		expect( MathHelper.percentToRange(0,0,0) ).toBe(0);
	} );

	it( '::percentToRange should be 0 when (0,0,100)', () =>
	{
		expect( MathHelper.percentToRange(0,0,100) ).toBe(0);
	} );

	it( '::percentToRange should be 100 when (100,0,100)', () =>
	{
		expect( MathHelper.percentToRange(100,0,100) ).toBe(100);
	} );

	it( '::percentToRange should be 200 when (100,0,200)', () =>
	{
		expect( MathHelper.percentToRange(100,0,200) ).toBe(200);
	} );

	it( '::percentToRange should be 50 when (50,0,100)', () =>
	{
		expect( MathHelper.percentToRange(50,0,100) ).toBe(50);
	} );

	it( '::percentToRange should be -50 when (-50,0,100)', () =>
	{
		expect( MathHelper.percentToRange(-50,0,100) ).toBe(-50);
	} );

	it( '::percentToRange should be 200 when (200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(200,0,100) ).toBe(200);
	} );

	it( '::percentToRange should be -200 when (-200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(-200,0,100) ).toBe(-200);
	} );

	it( '::percentToRange should be 2000 when (200,0,1000)', () =>
	{
		expect( MathHelper.percentToRange(200,0,1000) ).toBe(2000);
	} );

	it( '::percentToRange should be -2000 when (-200,0,1000)', () =>
	{
		expect( MathHelper.percentToRange(-200,0,1000) ).toBe(-2000);
	} );

	it( '::percentToRange should be 200 when (200,0,100)', () =>
	{
		expect( MathHelper.percentToRange(200,0,100) ).toBe(200);
	} );

	it( '::percentToRange should be -50 when (50,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(50,-100,0) ).toBe(-50);
	} );

	it( '::percentToRange should be 0 when (100,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(100,-100,0) ).toBe(0);
	} );

	it( '::percentToRange should be 100 when (200,-100,0)', () =>
	{
		expect( MathHelper.percentToRange(200,-100,0) ).toBe(100);
	} );

	it( '::percentToRange should be 0 when (0,100,0)', () =>
	{
		expect( MathHelper.percentToRange(0,100,0) ).toBe(0);
	} );

	it( '::percentToRange should be 50 when (50,100,0)', () =>
	{
		expect( MathHelper.percentToRange(50,100,0) ).toBe(50);
	} );

	it( '::percentToRange should be 100 when (100,100,0)', () =>
	{
		expect( MathHelper.percentToRange(100,100,0) ).toBe(100);
	} );

	it( '::percentToRange should be -200 when (-200,100,0)', () =>
	{
		expect( MathHelper.percentToRange(-200,100,0) ).toBe(-200);
	} );
} );
