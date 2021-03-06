import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from "./components/auth/auth.guard";

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'create',component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId',component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'test',component: TestComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signup',component: SignupComponent},
  // { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [AuthGuard],
    bootstrap: [],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }