import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductCardComponent } from '../../shared/components/dynamic-controls/product-card/product-card.component'
import { MaterialModule } from '../../material/material.module'
import { FilterComponent } from '../components/filter/filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ProductCardComponent, FilterComponent],
  exports: [ProductCardComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class ProductModule {}
