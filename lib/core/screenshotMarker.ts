import { Page } from 'playwright';
import { PageElement } from './pageScanner';

export async function highlightElements(page: Page, elements: PageElement[]) {
  // 🔍 Filtra elementos com seletores válidos para querySelector (exclui text=)
  const queryableElements = elements
    .map((el, idx) => ({ selector: el.selector, idx }))
    .filter(item => item.selector && !item.selector.startsWith('text='));

  // 🔧 Tenta localizar esses elementos com Playwright
  const handles = await Promise.all(
    queryableElements.map(item => page.$(item.selector))
  );

  // ✅ Filtra elementos válidos (não nulos)
  const valid = handles
    .map((el, i) => ({ el, idx: queryableElements[i].idx }))
    .filter(item => item.el !== null);

  // 🖍️ Insere destaque visual no DOM para cada elemento identificado
  await page.evaluate((infos) => {
    infos.forEach(({ idx, selector }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const r = el.getBoundingClientRect();
      const marker = document.createElement('div');
      marker.textContent = (idx + 1).toString();

      Object.assign(marker.style, {
        position: 'absolute',
        top: `${r.top + scrollY}px`,
        left: `${r.left + scrollX}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        border: '2px solid red',
        background: 'rgba(255, 0, 0, 0.1)',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '99999',
        pointerEvents: 'none'
      });

      document.body.appendChild(marker);
    });
  }, valid.map(item => ({
    idx: item.idx,
    selector: elements[item.idx].selector
  })));
}
