import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path : '',/// apunta a la ruta con sus hijos
        loadChildren : () => import('./features/movies/movies.routes').then((m)=>m.moviesRoutes)
    },
    // ruta para redireccion
    {
        path : '**',
        redirectTo : 'movies',
        pathMatch : 'full'
    }

];
