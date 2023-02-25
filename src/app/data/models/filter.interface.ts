import { FormControl } from '@angular/forms'
import {
  ClassifierInterface,
  getEmptyClassifierInterface,
} from './category.interface'

export interface FilterInterface {
  category?: FormControl<ClassifierInterface | null | undefined>
  brand?: FormControl<ClassifierInterface | null | undefined>
  ram?: FormControl<ClassifierInterface | null | undefined>
  cpu?: FormControl<ClassifierInterface | null | undefined>
}

export function getEmptyFilterInterface(): FilterInterface {
  const filter: FilterInterface = {
    category: new FormControl<ClassifierInterface | null>(
      getEmptyClassifierInterface()
    ),
    brand: new FormControl<ClassifierInterface | null>(
      getEmptyClassifierInterface()
    ),
    ram: new FormControl<ClassifierInterface | null>(
      getEmptyClassifierInterface()
    ),
    cpu: new FormControl<ClassifierInterface | null>(
      getEmptyClassifierInterface()
    ),
  }
  return filter
}
