import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title = 'Title'
  @Input() content = 'Content'
  @Input() link = '/home'
  @Input() imageLink = 'assets/img/profile%20(1).png'
}
