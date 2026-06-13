export function formatSoles(cents: number): string {
  return `S/. ${(cents / 100).toFixed(2)}`;
}
