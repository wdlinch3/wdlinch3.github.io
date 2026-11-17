/* Shared navigation for current and legacy Quarto packet web editions. */
document.addEventListener('DOMContentLoaded', () => {
  let toc = document.querySelector('#TOC');
  const content = document.querySelector('#quarto-document-content');
  if (!content) return;
  // This preserved legacy edition has no section headings. Use its existing
  // topic transitions as navigation targets without changing its prose.
  if (location.pathname.includes('/ss/aristarchus/')) {
    const topics = [
      ['Aristarchus of Samos (', 'aristarchus-background', 'Aristarchus and the solar system'],
      ['In the diagram at right,', 'relative-distances', 'Relative distances'],
      ['We will now use Aristarchus', 'relative-sizes', 'Apparent and physical sizes'],
      ['Next, consider the situation', 'lunar-eclipses', 'Lunar eclipses and Earth’s size'],
      ['Now, if only we could', 'eratosthenes', 'Eratosthenes and Earth’s radius']
    ];
    for (const [prefix, id, label] of topics) {
      const element = [...content.querySelectorAll('p, ol')].find(el => el.textContent.trim().startsWith(prefix));
      if (element) { element.id = id; element.dataset.packetNavLabel = label; }
    }
  }
  if (!toc) {
    const sidebar = document.querySelector('#quarto-margin-sidebar');
    if (!sidebar) return;
    toc = document.createElement('nav');
    toc.id = 'TOC'; toc.setAttribute('role', 'doc-toc');
    const title = document.createElement('h2'); title.id = 'toc-title'; title.textContent = 'On this page';
    toc.append(title, document.createElement('ul')); sidebar.append(toc);
  }
  const list = document.createElement('ul');
  const stack = [{level: 0, list}];
  for (const heading of content.querySelectorAll('h1, h2, h3, [data-packet-nav-label]')) {
    if (heading.closest('#title-block-header, blockquote, .footnotes') ||
        /^(Problem\b|Optional practice problem\b|WARNING:|Footnotes$)/i.test(heading.textContent.trim())) continue;
    const target = heading.id || (heading.parentElement.matches('section[id]') ? heading.parentElement.id : '');
    if (!target) continue;
    const level = heading.dataset.packetNavLabel ? 1 : Number(heading.tagName.slice(1));
    while (stack.length > 1 && level <= stack.at(-1).level) stack.pop();
    const parent = stack.at(-1);
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'nav-link';
    link.href = '#' + target;
    link.id = 'toc-' + target;
    link.dataset.scrollTarget = '#' + target;
    const label = heading.cloneNode(true);
    label.querySelectorAll('.anchorjs-link').forEach(el => el.remove());
    link.textContent = heading.dataset.packetNavLabel || label.textContent.trim();
    link.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.getElementById(target)?.scrollIntoView({behavior: 'instant', block: 'start'});
      history.replaceState(null, '', '#' + target);
    }, true);
    item.append(link);
    parent.list.append(item);
    const children = document.createElement('ul');
    item.append(children);
    stack.push({level, list: children});
  }
  list.querySelectorAll('ul:empty').forEach(el => el.remove());
  toc.querySelector(':scope > ul')?.replaceWith(list);
  const links = [...list.querySelectorAll('a')];
  let scheduled = false;
  const highlight = () => {
    scheduled = false;
    let active = links[0];
    for (const link of links) {
      if (document.getElementById(link.dataset.scrollTarget.slice(1))?.getBoundingClientRect().top <= 100) active = link;
    }
    links.forEach(link => {
      link.classList.toggle('active', link === active);
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(highlight); } }, {passive:true});
  highlight();
});
