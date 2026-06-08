import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Editorial desk',
    headline: 'Articles arranged with strong pacing, generous space, and cleaner reading cues.',
    description: 'Use this archive for essays, explainers, and story-led posts that benefit from a magazine-style presentation.',
    filterLabel: 'Filter article topic',
    secondaryNote: 'Long reads perform best when the page feels deliberate, calm, and clearly structured.',
    chips: ['Essays', 'Guides', 'Long-form reading'],
  },
  classified: {
    eyebrow: 'Offer board',
    headline: 'Listings and notices built for quick scanning and clear action.',
    description: 'This archive favors strong summaries, price or availability cues, and compact decision-friendly browsing.',
    filterLabel: 'Filter offer type',
    secondaryNote: 'Classified pages should feel brisk and useful without becoming visually flat.',
    chips: ['Offers', 'Fast scan', 'Practical details'],
  },
  sbm: {
    eyebrow: 'Saved collection',
    headline: 'Bookmarks presented like a shelf of carefully kept references.',
    description: 'Curated links work best when the page feels selective, calm, and easy to skim in batches.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Resource pages need grouping, concise metadata, and a sense of curation.',
    chips: ['References', 'Collections', 'Useful links'],
  },
  profile: {
    eyebrow: 'Profiles',
    headline: 'People and identities surfaced with confidence and context.',
    description: 'Profile pages should make names, roles, and short bios easy to understand at a glance.',
    filterLabel: 'Filter profile type',
    secondaryNote: 'Identity-first layouts help profiles feel intentional instead of buried in a generic feed.',
    chips: ['People', 'Identity', 'Recognition'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDFs displayed as a premium archive rather than an ordinary list.',
    description: 'Document pages should balance file utility with a refined interface that encourages browsing and return visits.',
    filterLabel: 'Filter document type',
    secondaryNote: 'File archives need clear actions, summary context, and a stronger sense of order.',
    chips: ['PDFs', 'Reports', 'Reference files'],
  },
  listing: {
    eyebrow: 'Directory desk',
    headline: 'Business listings organized for trust, comparison, and direct follow-up.',
    description: 'Directory surfaces should make locations, contact cues, and brand identity easier to compare.',
    filterLabel: 'Filter business type',
    secondaryNote: 'Listings feel stronger when identity, utility, and action paths stay visible.',
    chips: ['Directory', 'Compare', 'Business details'],
  },
  image: {
    eyebrow: 'Visual stream',
    headline: 'Image posts with gallery rhythm, larger media, and cleaner supporting text.',
    description: 'Visual archives should let imagery lead while keeping summaries and related navigation close at hand.',
    filterLabel: 'Filter visual topic',
    secondaryNote: 'A gallery should feel immersive first and descriptive second.',
    chips: ['Gallery', 'Visual notes', 'Image-led browsing'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
