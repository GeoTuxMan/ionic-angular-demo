import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage) },
  { path: 'faq', loadComponent: () => import('./faq/faq.page').then((m) => m.FaqPage) },
  { path: 'goal', loadComponent: () => import('./goal/goal.page').then((m) => m.GoalPage) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
