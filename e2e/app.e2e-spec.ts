import { Angular2FormsSpikePage } from './app.po';

describe('angular2-forms-spike App', function() {
  let page: Angular2FormsSpikePage;

  beforeEach(() => {
    page = new Angular2FormsSpikePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
