import { defineConfig, presets } from 'sponsorkit';

export default defineConfig({
  github: {
    login: 'raisiqueira',
  },
  width: 800,
  formats: ['json', 'svg', 'png'],
  tiers: [
    {
      title: 'Backers',
      preset: presets.base,
    },
    {
      title: 'Supporters',
      monthlyDollars: 10,
      preset: presets.medium,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.xl,
    },
  ],
});
