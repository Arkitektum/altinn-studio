import App from '../app';
import { Selector, t } from 'testcafe';
import RunTimePage from '../page-objects/runTimePage';
import DesignerPage from '../page-objects/designerPage';
import { AutoTestUser } from '../TestData';

let app = new App();
let designer = new DesignerPage();
let runtime = new RunTimePage();

/*
This fixture is no longer run after the test/preview functionality
has been removed from Altinn Studio, Selenium tests in the SBL project
now handle testing of instantiation of Altinn Apps.
*/
fixture.skip('Instantiation tests')
  .page(app.baseUrl)
  .beforeEach(async t => {
    await t
      .useRole(AutoTestUser)
      .maximizeWindow()
  })

  test("Instantiation of an access controlled app not possible", async () => {
    await t
      .navigateTo(app.baseUrl + 'designer/ttd/party-selection-app#/ui-editor')
      .expect(designer.testeNavigationTab.exists).ok( {timeout: 120000} )
      .click(designer.testeNavigationTab)
      .switchToIframe(runtime.testBrukerIframe)
      .expect(runtime.testUsers[0].exists).ok()
      .hover(runtime.testUsers[0])
      .click(runtime.testUsers[0])
      .expect(runtime.startNewButton.exists).ok({ timeout: 120000 })
      .click(runtime.startNewButton)
      .switchToMainWindow()
      .expect(Selector('span').withText('403').exists).ok( {timeout: 120000} )
  });

  test("Party Selection page with error message and party list", async () => {
    await t
      .navigateTo(app.baseUrl + 'designer/ttd/party-selection-app#/ui-editor')
      .click(designer.testeNavigationTab)
      .switchToIframe(runtime.testBrukerIframe)
      .expect(runtime.testUsers[1].exists).ok()
      .hover(runtime.testUsers[1])
      .click(runtime.testUsers[1])
      .expect(runtime.startNewButton.exists).ok({ timeout: 120000 })
      .click(runtime.startNewButton)
      .switchToMainWindow()
      .expect(Selector('p').withText('Velg ny aktør under').exists).ok({timeout:5000})
      .expect(Selector('p').withText('Dine aktører').exists).ok()
      .expect(Selector('p').withText('Kari Consulting').exists).ok()
  });

  test("Prefill of value from Profile and Register", async () => {
    await t
      .navigateTo(app.baseUrl + 'designer/AutoTest/prefillautotest#/ui-editor')
      .click(designer.testeNavigationTab)
      .switchToIframe(runtime.testBrukerIframe)
      .click(runtime.testUsers[0])
      .expect(runtime.startNewButton.exists).ok({ timeout: 120000 })
      .click(runtime.startNewButton)
      .switchToMainWindow()
      .expect(runtime.testUserHeader[0].exists).ok({ timeout:120000 })
      .expect(runtime.inputButton.exists).ok({ timeout: 120000 })
      .expect(runtime.inputButton.withAttribute('value', 'Ola Privatperson').exists).ok({ timeout:120000 })
  });
