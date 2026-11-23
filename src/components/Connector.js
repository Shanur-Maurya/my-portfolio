const NS = 'http://www.w3.org/2000/svg';

// Draws dotted curves from each card's inner edge to an anchor on the figure.
// Stateful (observes layout and redraws), so this one is a class.
export class Connector {
  constructor(stage, anchors) {
    this.stage = stage;
    this.anchors = anchors;
    this.wide = window.matchMedia('(min-width: 1024px)');
    this.svg = document.createElementNS(NS, 'svg');
    this.svg.setAttribute('class', 'hero__connectors');
    this.svg.setAttribute('aria-hidden', 'true');
    stage.append(this.svg);
  }

  start() {
    new ResizeObserver(() => this.draw()).observe(this.stage);
    this.wide.addEventListener('change', () => this.draw());
    document.fonts?.ready.then(() => this.draw());
  }

  draw() {
    this.svg.replaceChildren();
    const figure = this.stage.querySelector('.hero__figure');
    if (!this.wide.matches || !figure) return;
    const o = this.stage.getBoundingClientRect();
    const f = figure.getBoundingClientRect();
    this.svg.setAttribute('viewBox', `0 0 ${o.width} ${o.height}`);
    for (const [slot, [ax, ay]] of Object.entries(this.anchors)) {
      const card = this.stage.querySelector(`[data-slot="${slot}"]`);
      if (!card) continue;
      const c = card.getBoundingClientRect();
      const cardIsLeft = c.left + c.width / 2 < f.left + f.width / 2;
      const x1 = (cardIsLeft ? c.right : c.left) - o.left;
      const y1 = c.top + c.height / 2 - o.top;
      const x2 = f.left + ax * f.width - o.left;
      const y2 = f.top + ay * f.height - o.top;
      const mid = (x1 + x2) / 2;
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`);
      const dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('cx', x2); dot.setAttribute('cy', y2); dot.setAttribute('r', 3);
      this.svg.append(path, dot);
    }
  }
}
