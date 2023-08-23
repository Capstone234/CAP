describe('Example', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
      await element(by.text('I understand')).tap();
      await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
    });
  
    // Check that all menu items are displayed
    it('all menu items should be displayed', async () => {
      await expect(element(by.text('Start'))).toBeVisible();
      await expect(element(by.text('Home Page'))).toBeVisible();
      await expect(element(by.text('Login'))).toBeVisible();
      await expect(element(by.text('Reports'))).toBeVisible();
      await expect(element(by.text('Preliminary Tests'))).toBeVisible();
      await expect(element(by.text('Daily Symptom Checklist'))).toBeVisible();
      await expect(element(by.text('Concussion Action Plan'))).toBeVisible();
      await expect(element(by.text('VOMS Tests'))).toBeVisible();
      await expect(element(by.text('Continue Tests'))).toBeVisible();
    });
  
    // Check that navigation for "Start" button in menu works
    it('should be taken to disclaimer when pressing start', async () => {
      await expect(element(by.type('RCTScrollContentView'))).toBeVisible();
      await element(by.label('Start')).tap();
      await expect(element(by.text('Disclaimer'))).toBeVisible();
      await expect(element(by.text('I understand'))).toBeVisible();
    });
  
    // Check that navigation for "Home page" button in menu works
    it('should be taken to home page when pressing home page in menu', async () => {
      await element(by.label('Home Page')).tap();
      await expect(element(by.text('Concussion Check'))).toBeVisible();
      await expect(element(by.text('Begin Check'))).toBeVisible();
      await expect(element(by.text('View Reports'))).toBeVisible();
    });
  
    // Check that navigation for "Login" button in menu works
    it('should be taken to login page from menu item', async () => {
      await element(by.label('Login')).tap();
      await expect(element(by.text('Enter your first name and last name to login'))).toBeVisible();
      await expect(element(by.text('First Name'))).toBeVisible();
      await expect(element(by.text('Last Name'))).toBeVisible();
      await expect(element(by.text('Password'))).toBeVisible();
      await expect(element(by.text('Submit'))).toBeVisible();
      await expect(element(by.text('Sign Up'))).toBeVisible();
    });
  
    // Check that navigation for "Reports" button in menu works
    it('should be taken to reports page from menu item', async () => {
      await element(by.label('Reports')).tap();
      await expect(element(by.text('Which reports would you like to access?'))).toBeVisible();
      await expect(element(by.text('Preliminary Test Reports'))).toBeVisible();
      await expect(element(by.text('Daily Symptom Reports'))).toBeVisible();
    });
  
    // Check that navigation for "Preliminary tests" button in menu works
    it('should be taken to prelim tests from menu item', async () => {
      await element(by.label('Preliminary Tests')).tap();
      await expect(element(by.text('Start!'))).toBeVisible();
    });
  
    // Check that navigation for "Daily Symptom Checklist" button in menu works
    it('should be taken to DSC from menu item', async () => {
      await element(by.label('Daily Symptom Checklist')).tap();
      await expect(element(by.text('Does the affected person have any of these symptoms?'))).toBeVisible();
    });

    // Check that navigation for "Concussion Action Plan" button in menu works
    it('should be taken to CAP from menu item', async () => {
        await element(by.label('Concussion Action Plan')).tap();
        await expect(element(by.text('View Action Plan'))).toBeVisible();
    });
  
    // Check that navigation for "VOMS Tests" button in menu works
    it('should be taken to VOMS Tests from menu item', async () => {
        await element(by.label('VOMS Tests')).tap();
        await expect(element(by.text('VOMS Instructions'))).toBeVisible();
        await expect(element(by.text('The affected person will now be doing a series of tests that track their eye movements.'))).toBeVisible();
        await expect(element(by.text('Next'))).toBeVisible();
    });

    // Can continue tests
    it('should be able to continue tests', async () => {
      await element(by.label('Preliminary Tests')).tap();
      await element(by.label('Start!')).tap();
      await element(by.label('Start!')).tap();
      await element(by.label('Next')).tap();
      await element(by.label('Next')).tap();
      await element(by.label('Next')).tap();
      await element(by.label('Next')).tap();

      await expect(element(by.text('What three images does the injured individual remember?'))).toBeVisible();
      await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
      await element(by.label('Start')).tap();
      await element(by.label('I understand')).tap();
      await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
      await element(by.label('Continue Tests')).tap();
      await expect(element(by.text('What three images does the injured individual remember?'))).toBeVisible();
  });
});
  