import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegistrationFormComponent } from './auth/registration-form/registration-form.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth/auth.guard';

// const routes = [
//     {path:'',redirectTo:'login-form',pathMatch:'full'},
//     { path: 'login-form', component: LoginFormComponent },
// ]
const routes: Routes = [
    {
        path: 'products',
        canActivate: [AuthGuard],
        component: ProductsComponent,
        data: { title: 'List of Products' }
    },
    // {
    //     path: 'login',
    //     component: LoginFormComponent,
    //     data: { title: 'Login' }
    // },
    // {
    //     path: 'register',
    //     component: RegistrationFormComponent,
    //     data: { title: 'Register' }
    // }
];


@NgModule({
    declarations: [
        ],

    imports: [
        RouterModule.forChild(routes),

    ],
    exports: [
        RouterModule
    ]
})
export class ComponentRouteModule { }