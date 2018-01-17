import { EasingHelper } from './easing-helper';

describe( 'EasingHelper', () =>
{

	it( 'should create an instance', () =>
	{
		expect( new EasingHelper() ).toBeTruthy();
	} );

	it( 'expect using "ease" as an equation name to warn on invalid easing equation name', () =>
	{
		const instance = new EasingHelper();
		const spy = spyOn(console,'warn');
		const name = 'ease';
		instance.ease(name,1,2,3,4);

		expect(spy).toHaveBeenCalledWith( `"${name}" is not a valid easing equation name, will use "easeNone" instead`);
	});

	it( 'expect any unknown equation name to throw an error', () =>
	{
		const instance = new EasingHelper();
		const spy = spyOn(console,'warn');
		const name = <keyof EasingHelper> 'dummy-equation-name';
		instance.ease(name,1,2,3,4);

		expect(spy).toHaveBeenCalledWith( `"${name}" is not a valid easing equation name, will use "easeNone" instead`);
	});

	it( 'expect calls to "ease" method with any unknown equation name to use "easeNone" as default', () =>
	{
		// Avoid display of the warn into the test console.
		spyOn(console,'warn');

		const instance = new EasingHelper();
		const spy = spyOn(instance,'easeNone');
		const name = <keyof EasingHelper> 'dummy-equation-name';
		instance.ease(name,1,2,3,4);

		expect(spy).toHaveBeenCalled();
	});

	it( 'expect any of the equation name passed to "ease" method to call the equivalent method name', () =>
	{
		EasingHelper.easings.forEach( equationName =>
		{
			const instance = new EasingHelper();
			const spy = spyOn(instance,equationName);
			instance.ease(equationName,1,2,3,4, 1.70158);
			expect(spy).toHaveBeenCalledWith(1,2,3,4, 1.70158);
		});
	});

	it( 'expect any of the ease equation to return a number', () =>
	{
		EasingHelper.easings.forEach( equationName =>
		{
			const instance = new EasingHelper();
			const result:number = instance.ease(equationName,1,2,3,4, 1.70158);
			expect(result).not.toBeNaN();
			expect(result).not.toBeNull();
			expect(result).not.toBeUndefined();
		});
	});

	it( 'expect "easeNone" method to always return the same value whatever current or duration is', () =>
	{
		const instance = new EasingHelper();

		let random;
		expect(instance.easeNone(Math.random(),0,random=Math.random(),3)).toBe(random);
		expect(instance.easeNone(Math.random(), Math.PI,random=Math.random(),3)).toBe(Math.PI+random);
		expect(instance.easeNone( Math.random(),0,random=Math.random(),3)).toBe(random);
	});
} );
