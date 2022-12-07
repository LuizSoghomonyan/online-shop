import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../firebase/firebase.service";
import {Observable, of, tap} from "rxjs";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test$: Observable<any[]>;
  constructor(public firestore: FirebaseService) {
    this.test$ = of();
  }

  ngOnInit(): void {
    this.test$ = this.firestore.getTestData()
          .pipe(
              tap(x => console.log(x))

    );
    this.test$.subscribe()
  }

}
