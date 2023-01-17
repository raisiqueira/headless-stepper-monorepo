// eslint-disable-next-line import/no-anonymous-default-export
import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/raisiqueira/headless-stepper-monorepo',
  },
  docsRepositoryBase:
    'https://github.com/raisiqueira/headless-stepper-monorepo/tree/main/docs/pages',
  titleSuffix: ' – Headless Stepper',
  navigation: {
    next: true,
    prev: true,
  },
  darkMode: true,
  footer: {
    text: `MIT ${new Date().getFullYear()} © Raí Siqueira.`,
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
};

export default config;
