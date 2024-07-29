export function flattenString(input: string): string {
  // Remove all non-alphanumeric characters and spaces, then convert to lowercase
  return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
