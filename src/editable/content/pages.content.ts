import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium PDF library and curated reading',
      description: 'Discover PDFs, articles, and useful public resources through a refined editorial browsing experience.',
      openGraphTitle: 'Premium PDF library and curated reading',
      openGraphDescription: 'Browse polished PDF collections, public documents, and editorial picks in one elegant interface.',
      keywords: ['pdf library', 'document archive', 'curated reading', 'public resources'],
    },
    hero: {
      badge: '',
      title: ['A brighter way to collect,', 'browse, and revisit PDFs.'],
      description:
        'Explore public documents, reference pages, and editorial picks through a polished interface inspired by product landing pages and premium reading rooms.',
      primaryCta: { label: 'Browse PDF library', href: '/pdf' },
      secondaryCta: { label: 'Search everything', href: '/search' },
      searchPlaceholder: 'Search PDFs, guides, articles, and collections',
      focusLabel: 'Featured',
      featureCardBadge: 'homepage highlight',
      featureCardTitle: 'Useful pages deserve a clear visual system and a calmer browsing flow.',
      featureCardDescription: 'The homepage now leads with framed panels, editorial cards, and document-friendly discovery.',
    },
    intro: {
      badge: 'Why it works',
      title: 'Made for visitors who love keeping great files close at hand.',
      paragraphs: [
        'This site brings PDFs, articles, saved links, and supporting content into one cohesive environment so visitors can move between formats without losing context.',
        'Instead of feeling like a generic feed, every section is organized with more intention, stronger rhythm, and a clearer sense of hierarchy.',
        'The result is faster discovery, easier scanning, and a more memorable reading experience on desktop and mobile.',
      ],
      sideBadge: 'Highlights',
      sidePoints: [
        'Search-first discovery for document lovers.',
        'Multiple card styles to keep long pages visually alive.',
        'Safer fallbacks for missing images, categories, and summaries.',
        'A stronger editorial frame across archive and detail pages.',
      ],
      primaryLink: { label: 'Browse PDFs', href: '/pdf' },
      secondaryLink: { label: 'See all content', href: '/search' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Find the next file worth keeping.',
      description: 'Browse the document library, explore related sections, or contact the site through a calmer premium interface.',
      primaryCta: { label: 'Open the PDF library', href: '/pdf' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the library',
    title: 'A polished browsing environment for useful pages and PDFs.',
    description: `${slot4BrandConfig.siteName} is built to make documents, articles, and supporting resources feel organized, elegant, and easy to revisit.`,
    paragraphs: [
      'The experience balances editorial framing with practical discovery so visitors can scan quickly without losing the pleasure of reading well-structured pages.',
      'Across PDFs, articles, listings, image posts, and saved links, the site keeps a consistent visual rhythm that makes every section feel connected.',
      'The goal is simple: make useful content feel easier to keep, easier to share, and easier to come back to later.',
    ],
    values: [
      {
        title: 'Elegant utility',
        description: 'Useful content deserves clean spacing, confident typography, and intuitive visual hierarchy.',
      },
      {
        title: 'Discovery with momentum',
        description: 'Related posts, search surfaces, and mixed card designs help visitors keep exploring without fatigue.',
      },
      {
        title: 'Reliable presentation',
        description: 'Pages stay readable and functional even when some post fields are sparse or missing.',
      },
      {
        title: 'PDF-first browsing',
        description: 'Document pages get stronger previews, clearer calls to action, and a calmer reading flow.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach the site through a page that feels as considered as the library itself.',
    description:
      'Use this page for publication questions, partnership notes, feature ideas, or general support. Everything is framed clearly so the form does not feel like an afterthought.',
    formTitle: 'Send a note',
  },
  search: {
    metadata: {
      title: 'Search the library',
      description: 'Search PDFs, articles, images, profiles, listings, and saved resources across the site.',
    },
    hero: {
      badge: 'Unified search',
      title: 'Search the archive with clarity.',
      description: 'Use keywords, task types, and categories to find useful documents and related pages without digging through generic feeds.',
      placeholder: 'Search by title, topic, category, or keyword',
    },
    resultsTitle: 'Fresh from the archive',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and save a local content draft for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in to open the publishing desk.',
      description: 'Use your account to enter the draft workspace and prepare new content for any active section on the site.',
    },
    hero: {
      badge: 'Publishing desk',
      title: 'Draft new pages with a cleaner workflow.',
      description: 'Choose a section, add the essential fields, and save a polished draft with title, summary, link, image, and body content.',
    },
    formTitle: 'Draft details',
    submitLabel: 'Save draft',
    successTitle: 'Draft saved locally.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Return to your reading and publishing space.',
      description: 'Sign in to continue browsing, saving details, and opening the local drafting workspace.',
      formTitle: 'Log in',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create one first, then sign in.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and start collecting new pages.',
      description: 'Create an account to access the local drafting workspace and move more smoothly through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Log in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit official site',
    },
  },
} as const
