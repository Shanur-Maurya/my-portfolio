import profile from '../data/public-profile.json';

// Structure and toggles live here; public content lives in public-profile.json.
// Slot names (greeting, skills, ...) must match each card's data-slot.
export const siteConfig = {
  hero: {
    enabled: true,
    greeting: { enabled: true, text: 'Hello, I’m' },
    profile: { name: [profile.name.first, profile.name.last], photo: profile.photo },
    skills: { enabled: true, title: 'What I Do', description: profile.whatIDo, items: profile.skills },
    introduction: {
      enabled: true,
      title: profile.title,
      description: profile.introduction,
      cta: { label: 'Let’s Build Something Great', type: 'email' } // type: 'email' | 'link' (+ href)
    },
    location: { enabled: true, title: 'Where I’m Based', region: profile.location.region, map: profile.location.map },
    contact: { enabled: true, title: 'Get in touch', ...profile.contact },
    // Where each connector lands on the figure, as [x, y] fractions of the image.
    connectors: {
      greeting: [0.38, 0.11],
      skills: [0.08, 0.38],
      contact: [0.04, 0.74],
      introduction: [0.69, 0.12],
      location: [0.97, 0.61]
    }
  },
  projects: {
    enabled: true,
    title: 'Projects',
    description: profile.projectsIntro,
    ctaLabel: 'View case study',
    items: profile.projects
  },
  webui: { enabled: true, title: 'Web & UI design work', description: profile.webDesignIntro, items: profile.webDesigns },
  nav: { enabled: true, brand: `${profile.name.first[0]}${profile.name.last[0]}.` }
};
