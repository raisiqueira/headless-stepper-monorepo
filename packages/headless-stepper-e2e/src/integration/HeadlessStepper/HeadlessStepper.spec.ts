describe('headless-stepper: HeadlessStepper component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=headlessstepper--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to HeadlessStepper!');
    });
});
