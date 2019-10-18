import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';

const routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {
        path: 'login',
        component: LoginFormComponent,
        data: { title: 'Login' }
    },
    {
        path: 'register',
        component: RegistrationFormComponent,
        data: { title: 'Register' }
    }
   
    // { path: 'registration', component: RegistrationFormComponent },
    // { path: 'login', component: LoginFormComponent },
   // {path:'details',component:DetailsmodalComponent}
    
]


@NgModule({
    declarations: [
    ],

    imports: [
        RouterModule.forRoot(routes),

    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule { }