describe('The Action Plan', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.text('I understand')).tap();
    await element(by.type('RCTRootContentView')).swipe('right', 'fast', 0.5, 0.01, 0.01);
    await element(by.text('Concussion Action Plan')).tap();
  });

  it('should show head bumps symptoms', async () => {
    await element(by.text('Check Symptoms')).atIndex(0).tap();
    await expect(element(by.text("Back"))).toBeVisible();
  });

  it('should show all zones', async () => {
    await element(by.text('View Action Plan')).tap();
    await expect(element(by.text('Red Zone'))).toBeVisible();
    await expect(element(by.text('Orange Zone'))).toBeVisible();
    await expect(element(by.text('Yellow Zone'))).toBeVisible();
    await expect(element(by.text('Green Zone'))).toBeVisible();
  });

  it("should show additional information for the red zone", async () => {
    await element(by.text('View Action Plan')).tap();
    await element(by.text('Red Zone')).tap();
    await expect(element(by.text("RPE - Nothing at all, very very light. Heart rate < 120 bpm"))).toBeVisible();
  });

  it("should show additional information for the orange zone", async () => {
    await element(by.text('View Action Plan')).tap();
    await element(by.text('Orange Zone')).tap();
    await expect(element(by.text("RPE - Very light or light to moderate. Heart rate 120 - 140 bpm"))).toBeVisible();
  });

  it("should show additional information for the yellow zone", async () => {
    await element(by.text('View Action Plan')).tap();
    await element(by.text('Yellow Zone')).tap();
    await expect(element(by.text("RPE - Moderate to Hard. Heart rate 80% HRt +10% each week"))).toBeVisible();
  });

  it("should show additional information for the green zone", async () => {
    await element(by.text('View Action Plan')).tap();
    await element(by.text('Green Zone')).tap();
    await expect(element(by.text("RPE - Very Hard to Maximal. Heart rate 80 - 100% HRt"))).toBeVisible();
  });

  it("should show a Check Symptoms button", async () => {
    await element(by.text('View Action Plan')).tap();
    await expect(element(by.text('Check Symptoms'))).toBeVisible();
  });

  it("should show a new screen with information about HEAD BUMPS when clicking on the Check Symptoms button", async () => {
    await element(by.text('View Action Plan')).tap();
    await element(by.text('Check Symptoms')).tap();
    await expect(element(by.text("Over the next few days, symptoms may worsen or other symptoms may appear. Watch out for HEAD BUMPS (symptoms listed below). If they occur, seek urgent medical attention."))).toBeVisible();
  });
});
