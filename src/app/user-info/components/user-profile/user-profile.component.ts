import { Component, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Location } from '@angular/common'
import { UserDataInterface } from '../../models/user-data.interface'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  formGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    photoURL: new FormControl(''),
  })
  userData: UserDataInterface = { displayName: '', email: '' }

  constructor(
    private userService: UserService,
    private store: Store,
    private elRef: ElementRef,
    private _location: Location
  ) {
    this.userService.getCurrentUserData().subscribe((data) => {
      this.userData = data
      this.formGroup.controls.displayName.setValue(data.displayName)
      this.formGroup.controls.email.setValue(data.email)
      if (data.photoURL) {
        this.formGroup.controls.photoURL.setValue(data.photoURL)
      }
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.elRef.nativeElement.querySelector('form').submit
      if (this.formGroup.controls.displayName.value != null) {
        this.userService.updateProfile(
          this.formGroup.controls.displayName.value
        )
      }
      this._location.back()
    }
  }
}
