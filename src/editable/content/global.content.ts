import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'A refined home for useful documents and discoveries',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'PDF Library', href: '/pdf' },
      { label: 'Articles', href: '/article' },
      { label: 'Collections', href: '/sbm' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse Library', href: '/pdf' },
      secondary: { label: 'Create', href: '/create' },
    },
  },
  footer: {
    tagline: 'Elegant browsing for documents, stories, and curated finds',
    description:
      'As a dedicated PDF resource hub, our website offers a streamlined experience for finding, viewing, and sharing digital documents. Whether you are a student, professional, researcher, or casual reader, you will find a growing collection of PDFs covering a variety of subjects. We are committed to creating a reliable platform that supports easy access to information and efficient document management.',
    columns: [
      {
        title: 'Discover',
        links: [
          { label: 'PDF Library', href: '/pdf' },
          { label: 'Articles', href: '/article' },
          { label: 'Image Notes', href: '/image' },
          { label: 'Saved Links', href: '/sbm' },
        ],
      },
      {
        title: 'Navigate',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Search', href: '/search' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Reading comfort, clear navigation, and elegant page rhythm in every section.',
  },
  commonLabels: {
    readMore: 'Open page',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
