import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f9f4',
  '--slot4-page-text': '#15333a',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#fbfcf8',
  '--slot4-muted-text': '#4c6c70',
  '--slot4-soft-muted-text': '#6d8681',
  '--slot4-accent': '#35858e',
  '--slot4-accent-fill': '#35858e',
  '--slot4-accent-soft': '#e6eec9',
  '--slot4-accent-secondary': '#7da78c',
  '--slot4-accent-tertiary': '#c2d099',
  '--slot4-dark-bg': '#15333a',
  '--slot4-dark-text': '#f7fbf8',
  '--slot4-media-bg': '#dbe7df',
  '--slot4-cream': '#fbfcf8',
  '--slot4-warm': '#eef4ea',
  '--slot4-lavender': '#eaf4f2',
  '--slot4-gray': '#edf1eb',
  '--slot4-blue-band': '#35858e',
  '--slot4-body-gradient':
    'radial-gradient(circle at 20% 12%, rgba(230, 238, 201, 0.9), transparent 24%), radial-gradient(circle at 82% 18%, rgba(194, 208, 153, 0.45), transparent 18%), linear-gradient(180deg, #fdfefc 0%, #f2f6ef 55%, #edf3ee 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  blueBandBg: 'bg-[var(--slot4-blue-band)]',
  border: 'border-[#cad7cd]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_48px_rgba(21,51,58,0.08)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(21,51,58,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(21,51,58,0.02),rgba(21,51,58,0.68))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[220px] shrink-0 snap-start sm:w-[250px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'text-4xl font-black leading-[0.92] tracking-[-0.07em] sm:text-5xl lg:text-[4.75rem]',
    sectionTitle: 'text-3xl font-black tracking-[-0.06em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center rounded-[0.85rem] bg-[var(--slot4-accent-fill)] px-8 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(53,133,142,0.25)]',
    secondary:
      'inline-flex items-center justify-center rounded-[0.85rem] border border-[#cad7cd] bg-white px-8 py-3.5 text-sm font-black text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-soft)]',
    accent:
      'inline-flex items-center justify-center rounded-[0.85rem] bg-[#f0bc2b] px-8 py-3.5 text-sm font-black text-[#15333a] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(240,188,43,0.28)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.4rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(21,51,58,0.16)]',
    fade: 'transition duration-300 hover:opacity-88',
  },
} as const

export const aiLayoutRules = [
  'Mirror the high-level reference rhythm: airy white header, bold blue hero band, pale utility strip, content-on-white sections, and repeated framed modules.',
  'Keep all edits inside src/editable only and preserve exported names, props, and route entrypoints.',
  'Use multiple post-card silhouettes across archive and home sections instead of repeating one generic card.',
  'Prefer structured editorial blocks, faux product/mockup frames, and calm blue-green accents over template-like blog stacks.',
  'Keep dynamic post fetching intact and route every post through postHref() or buildPostUrl().',
  'Render safely when images, summaries, categories, locations, or URLs are missing.',
] as const
