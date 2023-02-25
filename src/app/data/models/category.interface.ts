export interface ClassifierInterface {
  name: string | null
  id?: number
}

export function getEmptyClassifierInterface(): ClassifierInterface {
  const result: ClassifierInterface = { name: '' }
  return result
}
