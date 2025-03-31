export function normalizeForVariable(text: string): string {
    return text
      .toLowerCase()
      .replace(/[áàâãä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  export function toCamelCase(text: string): string {
    return text
      .replace(/\s(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^\w/, c => c.toLowerCase());
  }
  