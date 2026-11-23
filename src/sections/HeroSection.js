import { h } from '../utils/dom.js';
import { createHeroImage } from '../components/HeroImage.js';
import { createSkillsCard } from '../components/SkillsCard.js';
import { createContactCard } from '../components/ContactCard.js';
import { createIntroCard } from '../components/IntroCard.js';
import { createLocationCard } from '../components/LocationCard.js';
import { Connector } from '../components/Connector.js';
import { getPublicEmail } from '../services/contact.service.js';

// Disabled pieces are never created, so they take no space.
export function createHeroSection(cfg) {
  const email = getPublicEmail(cfg.contact);
  const left = h('div', { class: 'hero__rail hero__rail--left' },
    cfg.greeting.enabled && h('p', { class: 'greeting', 'data-slot': 'greeting' }, cfg.greeting.text),
    cfg.skills.enabled && createSkillsCard(cfg.skills),
    cfg.contact.enabled && createContactCard(cfg.contact));
  const right = h('div', { class: 'hero__rail hero__rail--right' },
    cfg.introduction.enabled && createIntroCard(cfg.introduction, { email }),
    cfg.location.enabled && createLocationCard(cfg.location));
  const [first, ...rest] = cfg.profile.name;
  const center = h('div', { class: 'hero__center', 'data-slot': 'center' },
    h('h1', { class: 'hero__name' }, h('span', {}, first), ' ', ...rest.map((n) => h('span', {}, n))),
    createHeroImage(cfg.profile.photo));
  const stage = h('div', { class: 'hero__stage' }, center, left, right);
  new Connector(stage, cfg.connectors).start();
  return h('section', { class: 'hero', 'aria-label': 'Introduction' }, stage);
}
