import { PageElement } from './pageScanner';

export function generatePageObject(pageName: string, elements: PageElement[]): string {
  const declarations = elements
    .map(el => `  ${el.name}: Locator;`)
    .join('\n');

  const initializations = elements
    .map(el => `    this.${el.name} = page.${el.type}(${el.value});`)
    .join('\n');

  return `
import { Page, Locator } from '@playwright/test';

export class ${pageName} {
${declarations}

  constructor(private page: Page) {
${initializations}
  }
}
`.trim();
}
