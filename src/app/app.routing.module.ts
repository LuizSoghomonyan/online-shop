import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { TestComponent } from './test/test.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AuthGuard } from './auth/auth.guard'
import { HomeComponent } from './data/components/home/home.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-info/user.module').then((module) => module.UserModule),
  },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
