describe('A User', () => {
	beforeAll(async () => {
	  await device.launchApp();
	});
  
	beforeEach(async () => {
	  await device.reloadReactNative();
	  await element(by.text('I understand')).tap();
	  await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
	  await element(by.text('Login')).tap();
	});
  
	it('can create a new profile', async () => {
		await element(by.text("Sign Up")).tap();
		await element(by.type('RCTUITextField')).atIndex(0).typeText("Jason");
		await element(by.type('RCTUITextField')).atIndex(1).typeText("Bourne");
		await element(by.type('RCTUITextField')).atIndex(2).typeText("32");
		await element(by.type('RCTUITextField')).atIndex(3).typeText("81");
		await element(by.type('RCTUITextField')).atIndex(4).typeText("password");
		await element(by.text("Submit")).tap();
		// check we are back at the home page to indicate success
		await expect(element(by.text("Concussion Check"))).toBeVisible();
	});

	it('can login to a existing profile', async () => {
		await element(by.type('RCTUITextField')).atIndex(0).typeText("Jason");
		await element(by.type('RCTUITextField')).atIndex(1).typeText("Bourne");
		await element(by.type('RCTUITextField')).atIndex(2).typeText("password");
		await element(by.text("Submit")).tap();
		// check we are back at the home page to indicate success
		await expect(element(by.text("Concussion Check"))).toBeVisible();
	});

	it('receives error if password is incorrect', async () => {
		await element(by.type('RCTUITextField')).atIndex(0).typeText("Jason");
		await element(by.type('RCTUITextField')).atIndex(1).typeText("Bourne");
		await element(by.type('RCTUITextField')).atIndex(2).typeText("whoopsy");
		await element(by.text("Submit")).tap();
		// check we are back at the home page to indicate success
		await expect(element(by.text("Incorrect Login"))).toBeVisible();
	});
});