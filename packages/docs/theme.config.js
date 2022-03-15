// eslint-disable-next-line import/no-anonymous-default-export
export default {
  projectLink: 'https://github.com/raisiqueira/headless-stepper-monorepo',
  docsRepositoryBase:
    'https://github.com/raisiqueira/headless-stepper-monorepo/tree/main/packages/docs/pages',
  titleSuffix: ' – Headless Stepper',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Raí Siqueira.`,
  footerEditLink: `Edit this page on GitHub`,
  unstable_stork: false,
  unstable_flexsearch: true,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Headless Stepper: Production ready React hook to create awesome stepper components. Effortless to use, easy to customize."
      />
      <meta
        name="og:title"
        content="Headless Stepper: Production ready React hook to create awesome stepper components. Effortless to use, easy to customize."
      />
    </>
  ),
};
