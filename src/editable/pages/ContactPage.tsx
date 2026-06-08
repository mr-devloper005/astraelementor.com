'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: FileText, title: 'Document suggestions', body: 'Share a useful file, a better category idea, or a note about a public resource that should be easier to discover.' },
  { icon: Building2, title: 'Partnership inquiries', body: 'Reach out for collaborations, editorial partnerships, and category-level opportunities across the site.' },
  { icon: ImageIcon, title: 'Feature requests', body: 'Suggest new archive views, discovery improvements, or visual updates that would make browsing stronger.' },
  { icon: Phone, title: 'General support', body: 'Use the form for access questions, local draft help, and general publishing or browsing feedback.' },
]

const reach = [
  { icon: Mail, label: 'Response style', value: 'Clear and concise' },
  { icon: MapPin, label: 'Best for', value: 'Questions, ideas, and collaborations' },
  { icon: Sparkles, label: 'Focus', value: 'Better document discovery' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-4 py-12 text-[var(--slot4-page-text)] sm:px-6 lg:px-8 lg:py-16">
        <section className="mx-auto max-w-[1440px] overflow-hidden rounded-[2.4rem] border border-[#ced9d1] bg-white shadow-[0_24px_70px_rgba(21,51,58,0.09)]">
          <div className="grid gap-8 bg-[var(--slot4-blue-band)] px-6 py-8 text-white lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.07em]">{pagesContent.contact.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/84">{pagesContent.contact.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {reach.map((item) => (
                <div key={item.label} className="rounded-[1.6rem] border border-white/16 bg-white/12 p-4 backdrop-blur">
                  <item.icon className="h-5 w-5" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/72">{item.label}</p>
                  <p className="mt-2 text-sm font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-10">
            <div className="grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.8rem] border border-[#d5dfd9] bg-[#f8fbf8] p-5">
                  <lane.icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <h2 className="mt-3 text-xl font-black tracking-[-0.04em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-[#d5dfd9] bg-[#f4f8f3] p-5 sm:p-6">
              <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
