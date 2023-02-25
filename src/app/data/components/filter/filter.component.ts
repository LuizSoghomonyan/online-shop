import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ClassifierInterface } from '../../models/category.interface'
import { FilterInterface } from '../../models/filter.interface'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  form: FormGroup
  category$: ClassifierInterface[]
  brand$: ClassifierInterface[]
  ram$: ClassifierInterface[]
  cpu$: ClassifierInterface[]

  constructor() {
    this.form = new FormGroup<FilterInterface>({
      category: new FormControl<ClassifierInterface | null>({ name: null }),
      brand: new FormControl<ClassifierInterface | null>({ name: null }),
      ram: new FormControl<ClassifierInterface | null>({ name: null }),
      cpu: new FormControl<ClassifierInterface | null>({ name: null }),
    })

    this.category$ = [
      {
        name: 'Value1',
      },
      {
        name: 'Value2',
      },
      {
        name: 'Value3',
      },
    ]
    this.brand$ = [
      {
        name: 'Brand1',
      },
      {
        name: 'Brand2',
      },
      {
        name: 'Brand3',
      },
    ]
    this.ram$ = [
      {
        name: 'RAM1',
      },
      {
        name: 'RAM2',
      },
      {
        name: 'RAM3',
      },
    ]
    this.cpu$ = [
      {
        name: 'CPU1',
      },
      {
        name: 'CPU2',
      },
      {
        name: 'CPU3',
      },
    ]
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log('onSubmit')
    }
  }
}
