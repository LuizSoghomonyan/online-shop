import {
  Component,
  OnInit,
  AbstractType,
  Type,
  AfterContentInit,
  assertPlatform,
} from '@angular/core'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  ttt: number = 12312
  ttt22: number = 12312
  ttt212: number = 12312
  ttt2312: number = 12312
  ttt21112: number = 12312
  ttt211122: number = 12312
  constructor() {}
  ngOnInit() {}
}
