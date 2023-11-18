# Frontend ModuloWeb

## Development server

Start Project

``` 
npm install

ng s

```

## Explication Code
(Spanish)

Hola programador, si estas pensando en editar este codigo te hare una guia rapido de lo que encontraras en caso de que necesites editarlo

### Encarpetado

Lo mas parobables es que encuentres algo como esto:

```

├───app
│   ├───core
│   │   ├───data
│   │   ├───directives
│   │   ├───guards
│   │   ├───interceptors
│   │   ├───interfaces
│   │   ├───model
│   │   ├───observable
│   │   └───services
│   ├───layout
│   ├───pages
│   │   ├───admin
│   │   │   ├───console-admin
│   │   │   ├───password-change
│   │   │   ├───password-user
│   │   │   ├───properties
│   │   │   └───update-data-base
│   │   ├───client
│   │   │   ├───auxiliaries
│   │   │   ├───change-user-password
│   │   │   ├───complement-data
│   │   │   ├───contact-entity
│   │   │   ├───credit-application
│   │   │   ├───credit-lines
│   │   │   ├───credit-simulator
│   │   │   ├───extract-balance
│   │   │   ├───extracts
│   │   │   ├───formats
│   │   │   ├───menu-client
│   │   │   └───state-application
│   │   └───login
│   │       └───login-box
│   └───shared
│       └───not-found
├───assets
│   ├───icons
│   │   ├───admin
│   │   ├───client
│   │   │   └───statement
│   │   └───user
│   ├───images
│   └───scss
└───environments

```

#### Core

Archivos que comparten información, interfaces, observables, archivos planos, servicios etc.. subdivididos por sus respectivas carpetas, esta demas mencionar la importancia de esta parte del proyecto pues realiza la labor de login al aplicativo y la restricción de usuarios no deseados por medio de guardianas.

Consideramos de manera necesario mencionar dart información sobre interfaces, pues la llegadas del back, deben ser validadas por su interface, response, es aconsejable que ubique en interfaces información repetida y la cual requiere validar sus campos para su posterior uso. Ademas se maneja el data para la posterior activación y desactivación de los botones para la vista de usuario.  

#### Layout

Componente principal, donde se despliegue los demás componentes, contiene características generales que se reparten en todo el aplicativo, como lo es el footer, los títulos dinámicos, el menu de ayuda para cada sección y desplegable de información adicional. 

#### Pages

Se divide en las 2 vistas principales del modulo web, las cuales son el administrador y el usuario, los componente afectados por dicha vistas se encuentran allí. Esta distinción se hace con el fin de separar de manera clara los componentes que puede afectar una vista u otra.

#### Shared

Componentes compartidos entre la vista de administrador y usuario, puede que funcionalidades o componentes se repartan entre las dos vistas, de modo que en vez de realizar un mismo componente 2 veces, se coloca en shared con el fin que para el programador sea de manera eficiente su ubicación y organización.

#### Assets

Todo el material gráfico del sitio, imágenes, iconos, fuentes, colores etc...

- Tabla (componente que se usa en los reportes)
- Pagina 404

Se menciona una mejora a futuro, la cual es relevante, y es hacer la conversion de las imágenes a utilizar en formato .webp pues con dicho cambio se puede mejorar la carga de cada vista de manera notoria.

#### Enviorment 

Se declaran las variables globales necesarias para la conexión con el backend, ya sea en un puerto local del mismo PC, o un servidor desde donde se realicen las respectivas peticiones.


## Builds project

Si ya haz llegado hasta aca, es por que quieres realizar un build del aplicativo, si ya seguiste nuestra consideraciones anteriores, lo unico que debes hacer es:

``` 
ng build

```
    
Creara una carpeta dist con todo los archivos necesarios para el ejecución del proyecto en entornos de producción.

## Autores
 [<img src="https://avatars.githubusercontent.com/u/67118793?v=4" border-radius=100 width=100><br><sub>Carlos Mora</sub>](https://github.com/Fozzy3)
