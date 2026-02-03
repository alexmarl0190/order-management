import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Layout } from './core/layout/layout';
import { UsersPage } from './users/users-page/users-page';

export const routes: Routes = [

    {
        path: 'login',
        loadComponent: () =>
            import('./features/login/login')
                .then(m => m.Login)
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [

            {
                path: '',
                loadComponent: () =>
                    import('./features/home/home')
                        .then(m => m.Home),
                data: { title: 'Home' }
            },

            {
                path: 'users',
                loadComponent: () =>
                    import('./users/users-page/users-page')
                        .then(m => m.UsersPage),
                data: { title: 'Gestión de Usuarios' }
            },

            {
                path: 'agreements',
                loadComponent: () =>
                    import('./agreements/agreements')
                        .then(m => m.Agreements),
                data: { title: 'Acuerdos Globales' }
            },
            {
                path: 'reports',
                loadComponent: () =>
                    import('./reports/reports/reports')
                        .then(m => m.Reports),
                data: { title: 'Reportes' }
            }

        ]
    },
    { path: '**', redirectTo: '' }
];
