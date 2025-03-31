import { Page } from 'playwright';
import { PageElement } from './pageScanner';

export async function captureScreenshotWithHighlights(page: Page, elements: PageElement[]) {
  await highlightElements(page, elements);

  const screenshot = await page.screenshot({ fullPage: true });

  return screenshot;
}

export async function highlightElements(page: Page, elements: PageElement[]) {
  const queryableElements = elements
    .map((el, idx) => ({ selector: el.selector, idx }));

  for (const { selector, idx } of queryableElements) {
    try {
      let element;

      if (selector.startsWith('text=')) {
        element = await page.locator(selector);
      } else {
        element = await page.locator(selector);
      }

      const count = await element.count();
      if (count > 1) {
        console.log(`Múltiplos elementos encontrados para o seletor: ${selector}. Selecionando o primeiro.`);
        element = element.first();
      }

      const boundingBox = await element.boundingBox();
      if (!boundingBox) continue;

      await page.evaluate(({ idx, boundingBox }) => {
        const marker = document.createElement('div');
        marker.textContent = (idx + 1).toString();

        Object.assign(marker.style, {
          position: 'absolute',
          top: `${boundingBox.y + window.scrollY}px`,
          left: `${boundingBox.x + window.scrollX}px`,
          width: `${boundingBox.width}px`,
          height: `${boundingBox.height}px`,
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
      }, { idx, boundingBox });
    } catch (error) {
      console.log(`Erro ao localizar elemento: ${selector}`, error);
    }
  }
}
