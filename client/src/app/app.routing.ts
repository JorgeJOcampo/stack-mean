import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { UserEditComponent } from './component/user-edit.component'

const appRoutes : Routes = [
    {path: '', component: UserEditComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: UserEditComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
