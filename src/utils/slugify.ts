/** Lowercase ASCII letters and digits only, e.g. "João Gonçalves" → "joaogoncalves". */
export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}
