export function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function formatGender(genderLetter: 'M' | 'F') {
  return genderLetter === 'M' ? 'Masculino' : 'Feminino'
}
