/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Headless Stepper',
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
};

export default defaultSEOConfig;
