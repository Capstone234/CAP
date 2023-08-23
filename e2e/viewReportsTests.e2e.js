describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
    
    // Testing how the "View Reports" page looks like when NOT logged in
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
    });
  
    // Check that user gets taken to reports page
    it('when pressing view reports, should be taken to reports page', async () => {
        await element(by.text('View Reports')).tap();
        await expect(element(by.text('Which reports would you like to access?'))).toBeVisible();
        await expect(element(by.text('Preliminary Test Reports'))).toBeVisible();
        await expect(element(by.text('Daily Symptom Reports'))).toBeVisible();
    });

    // If user not logged in, check that they get taken to login page when pressing "Preliminary Test Reports"
    it('when not logged in, should be taken to login page when trying to access prelim', async () => {
        await element(by.text('View Reports')).tap();
        await element(by.text('Preliminary Test Reports')).tap();
        await expect(element(by.text('Alert'))).toBeVisible();
        await expect(element(by.text('Need to Login to see reports'))).toBeVisible();
        await expect(element(by.text('OK'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.text('Enter your first name and last name to login'))).toBeVisible();
        await expect(element(by.text('First Name'))).toBeVisible();
        await expect(element(by.text('Last Name'))).toBeVisible();
        await expect(element(by.text('Password'))).toBeVisible();
        await expect(element(by.text('Submit'))).toBeVisible();
        await expect(element(by.text('Sign Up'))).toBeVisible();
    });

    // If user not logged in, check that they get taken to login page when pressing "Preliminary Test Reports"
    it('when not logged in, should be taken to login page when trying to access DSR', async () => {
      await element(by.text('View Reports')).tap();
      await element(by.text('Daily Symptom Reports')).tap();
      await expect(element(by.text('Alert'))).toBeVisible();
      await expect(element(by.text('Need to Login to see reports'))).toBeVisible();
      await expect(element(by.text('OK'))).toBeVisible();
      await element(by.text('OK')).tap();
      await expect(element(by.text('Enter your first name and last name to login'))).toBeVisible();
      await expect(element(by.text('First Name'))).toBeVisible();
      await expect(element(by.text('Last Name'))).toBeVisible();
      await expect(element(by.text('Password'))).toBeVisible();
      await expect(element(by.text('Submit'))).toBeVisible();
      await expect(element(by.text('Sign Up'))).toBeVisible();
  });
});
  