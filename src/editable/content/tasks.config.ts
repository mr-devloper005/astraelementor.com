import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: false,
  sbm: false,
  profile: false,
  pdf: true,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Editorial article pages with refined reading layouts",
  classified: "Classified pages shaped for clearer scanning and action",
  sbm: "Saved-link collections with shelf-like discovery patterns",
  profile: "Profile pages with stronger introduction and identity blocks",
  pdf: "PDF and document pages presented like a premium archive",
  listing: "Business directory pages with clearer trust and contact cues",
  image: "Image and gallery pages with larger visual framing",
} satisfies Record<TaskKey, string>;
