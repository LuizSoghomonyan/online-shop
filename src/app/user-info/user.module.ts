import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { UserGeneralComponent } from './components/user-general/user-general.component'
import { CardComponent } from '../shared/components/card/card.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'

const routes: Routes = [
  { path: '', component: UserGeneralComponent },
  { path: 'profile', component: UserProfileComponent },
]

@NgModule({
  declarations: [UserGeneralComponent, CardComponent, UserProfileComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UserModule {}
