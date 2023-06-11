describe('headless-stepper: HeadlessStepper component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=headlessstepper-usestepper--use-stepper')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to HeadlessStepper!');
  });

  it('should navigate by clicking on the menu unless it is disabled', () => {
    cy.get('p').should('contain.text', 'Current step: 0');

    cy.get('ol > a').each((element) => {
      const { attributes, textContent } = element[0];
      const [, step] = textContent.split(' ');

      const ariaDisabled = attributes.getNamedItem('aria-disabled');
      const stepNumber = Number(step) - 1; // If step is called "Step 1" the index is 0

      cy.wrap(element).click();

      if (ariaDisabled) {
        /**
         * -1 means the step was not changed since it is disabled.
         */
        cy.get('p').should('contain.text', `Current step: ${stepNumber - 1}`);
      } else {
        cy.get('p').should('contain.text', `Current step: ${stepNumber}`);
      }

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(200);
    });

    cy.get('p').should('contain.text', 'Current step: 5');
  });
});
