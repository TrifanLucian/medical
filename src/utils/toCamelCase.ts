export const toCamelCase = (str: string) => str
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+(.)/g, (_match, chr) => chr.toUpperCase());
