import { TheSlidePage } from './app.po';

describe('the-slide App', function() {
  let page: TheSlidePage;

  beforeEach(() => {
    page = new TheSlidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
