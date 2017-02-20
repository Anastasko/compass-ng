import { CompassNgPage } from './app.po';

describe('compass-ng App', () => {
  let page: CompassNgPage;

  beforeEach(() => {
    page = new CompassNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
