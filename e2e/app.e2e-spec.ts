import { SmartDropdownPage } from './app.po';

describe('smart-dropdown App', () => {
  let page: SmartDropdownPage;

  beforeEach(() => {
    page = new SmartDropdownPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
