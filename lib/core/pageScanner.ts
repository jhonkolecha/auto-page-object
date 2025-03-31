import { Page } from 'playwright';
import { normalizeForVariable, toCamelCase } from './utils/camelCase';

export interface PageElement {
  name: string;
  type: string;
  value: string;
  selector: string;
}

export async function scanPageElements(page: Page): Promise<PageElement[]> {
  const elements = await page.$$(
    'a, button, input, textarea, select, [role="button"], [role="link"]'
  );

  const result: PageElement[] = [];

  for (const el of elements) {
    const visible = await el.isVisible().catch(() => false);
    if (!visible) continue;

    const [id, nameAttr, placeholder, ariaLabel, role] = await Promise.all([
      el.getAttribute('id'),
      el.getAttribute('name'),
      el.getAttribute('placeholder'),
      el.getAttribute('aria-label'),
      el.getAttribute('role')
    ]);

    let text = await el.innerText().catch(() => '');
    text = text.replace(/\s+/g, ' ').trim().slice(0, 40);
    if (text.split(' ').length > 2) text = '';

    let locatorType = '';
    let locatorValue = '';
    let selector = '';
    let rawName = '';

    if (ariaLabel && role) {
      locatorType = 'getByRole';
      locatorValue = `"${role}", { name: "${ariaLabel.trim()}" }`;
      selector = `[role="${role}"][aria-label="${ariaLabel.trim()}"]`;
      rawName = ariaLabel;
    } else if (placeholder) {
      locatorType = 'getByPlaceholder';
      locatorValue = `"${placeholder.trim()}"`;
      selector = `[placeholder="${placeholder.trim()}"]`;
      rawName = placeholder;
    } else if (text) {
      locatorType = 'getByText';
      locatorValue = `"${text}"`;
      selector = `text="${text}"`;
      rawName = text;
    } else if (id) {
      locatorType = 'locator';
      locatorValue = `"#${id}"`;
      selector = `#${id}`;
      rawName = id;
    } else if (nameAttr) {
      locatorType = 'locator';
      locatorValue = `"[name=\\"${nameAttr}\\"]"`;
      selector = `[name="${nameAttr}"]`;
      rawName = nameAttr;
    }

    if (!locatorType || !locatorValue || !selector) continue;

    const base = normalizeForVariable(rawName || role || 'element');
    const semanticPrefix = getSemanticPrefix({ locatorType, role });
    const name = toCamelCase(`${semanticPrefix} ${base}`);

    if (!name || /^\d/.test(name)) continue;

    result.push({ name, type: locatorType, value: locatorValue, selector });
  }

  return result;
}

function getSemanticPrefix({ locatorType, role }: { locatorType: string; role: string | null }): string {
  if (locatorType === 'getByRole') {
    switch (role) {
      case 'button':
        return 'btn';
      case 'link':
        return 'link';
      case 'combobox':
      case 'listbox':
      case 'menu':
      case 'radiogroup':
        return 'select';
      case 'textbox':
      case 'searchbox':
      case 'textarea':
        return 'field';
      default:
        return 'el';
    }
  }

  if (locatorType === 'getByPlaceholder') return 'field';
  if (locatorType === 'locator') return 'el';
  if (locatorType === 'getByText') return 'btn'; // heurística para textos clicáveis

  return 'el';
}