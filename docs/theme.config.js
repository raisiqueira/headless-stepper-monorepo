// eslint-disable-next-line import/no-anonymous-default-export
/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  project: {
    link: 'https://github.com/raisiqueira/headless-stepper-monorepo',
  },
  docsRepositoryBase:
    'https://github.com/raisiqueira/headless-stepper-monorepo/tree/main/docs/pages',
  darkMode: true,
  footer: {
    text: `MIT ${new Date().getFullYear()} © Raí Siqueira.`,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  logo: () => (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">
        Headless Stepper
      </span>
    </>
  ),
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
  useNextSeoProps: () => ({
    titleTemplate: '%s | Headless Stepper',
    defaultTitle: 'Headless Stepper',
    description:
      'Production ready React hook to create awesome stepper components. Effortless to use, easy to customize.',
    canonical: 'https://headless-stepper.netlify.app',
    openGraph: {
      url: 'https://headless-stepper.netlify.app',
      title: 'Headless Stepper',
      description:
        'Production ready React hook to create awesome stepper components. Effortless to use, easy to customize.',
      images: [
        {
          url: 'https://headless-stepper.netlify.app/GH_Cover.png',
          alt: 'Headless Stepper og-image',
        },
      ],
      site_name: 'Headless Stepper',
    },
    twitter: {
      handle: '@rai_siqueira',
      cardType: 'summary_large_image',
    },
  }),
};
