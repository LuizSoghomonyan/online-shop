import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FilterComponent } from '../filter/filter.component'
import {
  FilterInterface,
  getEmptyFilterInterface,
} from '../../models/filter.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filters: FilterInterface
  constructor(private dialog: MatDialog) {
    this.filters = getEmptyFilterInterface()
  }
  openFilters() {
    this.dialog
      .open(FilterComponent, { width: '50%' })
      .afterClosed()
      .subscribe((data: FilterInterface) => {
        this.filters['category'] = data.category
        this.filters['brand'] = data.brand
        this.filters['ram'] = data.ram
        this.filters['cpu'] = data.cpu

        console.log(this.filters)
      })
  }
}
