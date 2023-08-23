describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
    
    // Testing how the "View Reports" page looks like when logged in
    beforeEach(async () => {
        await device.reloadReactNative();
        await element(by.text('I understand')).tap();

        // Signing up and logging in
        await element(by.text('View Reports')).tap();
        await element(by.text('Preliminary Test Reports')).tap();
        await element(by.text('OK')).tap();
        await element(by.text('Sign Up')).tap();
        await element(by.type('RCTUITextField')).atIndex(0).typeText('William');
        await element(by.type('RCTUITextField')).atIndex(1).typeText('Johnson');
        await element(by.type('RCTUITextField')).atIndex(2).typeText('16');
        await element(by.type('RCTUITextField')).atIndex(3).typeText('80');
        await element(by.type('RCTUITextField')).atIndex(4).typeText('hey123');
        await element(by.text('Submit')).tap();
        await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
        await element(by.text('Login')).tap();
        await element(by.type('RCTUITextField')).atIndex(0).typeText('William');
        await element(by.type('RCTUITextField')).atIndex(1).typeText('Johnson');
        await element(by.type('RCTUITextField')).atIndex(2).typeText('hey123');
        await element(by.text('Submit')).tap();
        await element(by.text('OK')).tap();
        await element(by.text('View Reports')).tap();
    });

    // If user is logged in, check that they can see incident reports
    it('User can login to see incident reports in View Reports', async () => {

        // Check that there are no incident reports
        await element(by.text('Daily Symptom Reports')).tap();
        await expect(element(by.text('All Daily Symptom Reports for William'))).toBeVisible();
        await expect(element(by.text('No such reports.'))).toBeVisible();
        await expect(element(by.text('Return to Home'))).toBeVisible();
    });

    // If user is logged in, check that they can see preliminary reports
    it('User should be able to see preliminary reports in View Reports when logged in', async () => {

      // Check that there are no preliminary test reports
      await element(by.text('Preliminary Test Reports')).tap();
      await expect(element(by.text('All Preliminary Reports for William'))).toBeVisible();
      await expect(element(by.text('No such reports.'))).toBeVisible();
  });
});