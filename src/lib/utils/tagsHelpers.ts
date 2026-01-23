export function denormalizeTag(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ')
}

export function formatTagForDisplay(tag: string): string {
  if (/[^\x00-\x7F]/.test(tag)) {
    return tag
  }
  return tag
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}