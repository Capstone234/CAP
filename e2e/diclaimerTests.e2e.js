describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a disclaimer screen', async () => {
    await expect(element(by.text('Disclaimer'))).toBeVisible();
  });

  it('should show main screen after accepting disclaimer', async () => {
    await element(by.text('I understand')).tap();
    await expect(element(by.text('Concussion Check'))).toBeVisible();
    await expect(element(by.text('Begin Check'))).toBeVisible();
    await expect(element(by.text('View Reports'))).toBeVisible();
  });
});
