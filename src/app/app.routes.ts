import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeEjerciciosComponent } from './ejercicios/home-ejercicios/home-ejercicios.component';
import { Ejercicio1Component } from './ejercicios/ejercicio1/ejercicio1.component';
import { Ejercicio2Component } from './ejercicios/ejercicio2/ejercicio2.component';
import { HomeTiendaComponent } from './tienda/home-tienda/home-tienda.component';
import { LoginComponent } from './tienda/login/login.component';
import { RegistroComponent } from './tienda/registro/registro.component';
import { TiendasComponent } from './tienda/tiendas/tiendas.component';
import { CrearTiendasComponent } from './tienda/tiendas/crear-tiendas.component';
import { ActualizarTiendasComponent } from './tienda/tiendas/actualizar-tiendas.component';
import { ArticulosComponent } from './tienda/articulos/articulos.component';
import { CreaArticulosComponent } from './tienda/articulos/crea-articulos.component';
import { ActualizarArticulosComponent } from './tienda/articulos/actualizar-articulos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'ejercicios',
        component: HomeEjerciciosComponent,
        children: [
            {
                path: 'ejercicio1',
                component: Ejercicio1Component
            },
            {
                path: 'ejercicio2',
                component: Ejercicio2Component
            },
        ]
    },
    {
        path: 'tiendas',
        component: HomeTiendaComponent,
        children: [
            {
                path: 'registro',
                component: CrearTiendasComponent
            },
            {
                path: 'tiendas',
                component: TiendasComponent
            },
            {
                path: 'actualizar/:name',
                component: ActualizarTiendasComponent
            }
        ]
    },
    {
        path: 'articulos',
        component: HomeTiendaComponent,
        children: [
            {
                path: 'registro',
                component: CreaArticulosComponent
            },
            {
                path: 'articulos',
                component: ArticulosComponent
            },
            {
                path: 'actualizar/:name',
                component: ActualizarArticulosComponent
            }
        ]
    },
    {
        path: 'inicio',
        component: HomeTiendaComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegistroComponent
            }
        ]
    },
    {
        path: '**',
        component: HomeComponent
    }
];


