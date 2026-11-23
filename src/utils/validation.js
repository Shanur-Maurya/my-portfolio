export function validateSiteConfig(cfg) {
  const errors = [];
  const need = (ok, msg) => { if (!ok) errors.push(msg); };
  const hero = cfg.hero;
  need(hero, 'hero config is missing');
  if (hero) {
    need(Array.isArray(hero.profile?.name) && hero.profile.name.length > 0, 'hero.profile.name must be a non-empty array');
    need(hero.profile?.photo?.src && hero.profile?.photo?.alt, 'hero.profile.photo needs src and alt');
    const ids = new Set();
    for (const s of hero.skills?.items ?? []) {
      need(s.id && s.label && Number.isFinite(s.order), `skill needs id, label and order: ${JSON.stringify(s)}`);
      need(!ids.has(s.id), `duplicate skill id: ${s.id}`);
      ids.add(s.id);
    }
  }
  for (const key of ['projects', 'webui']) {
    const ids = new Set();
    for (const it of cfg[key]?.items ?? []) {
      need(it.id && Number.isFinite(it.order), `${key} item needs id and order: ${JSON.stringify(it)}`);
      need(!ids.has(it.id), `duplicate ${key} id: ${it.id}`);
      ids.add(it.id);
      if (key === 'webui') need(it.src && it.alt, `${key} item needs src and alt: ${it.id}`);
    }
  }
  if (errors.length) throw new Error('Invalid site config:\n- ' + errors.join('\n- '));
}

// Only allow link schemes we expect; anything else becomes "#".
export function safeHref(href) {
  try {
    const url = new URL(href, window.location.origin);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? href : '#';
  } catch {
    return '#';
  }
}
