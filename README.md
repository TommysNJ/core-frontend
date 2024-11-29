# Frontend - Sistema de Gestión de Cursos y Usuarios

## 1. Título del Proyecto

Sistema de Gestión de Cursos y Usuarios - Frontend

## 2. Descripción del Proyecto
Este es el frontend del sistema de gestión de cursos y usuarios. 
Desarrollado en React, el frontend proporciona una interfaz de 
usuario (UI) intuitiva y adaptada para cada tipo de usuario, ya 
sea alumno, instructor o administrador. El diseño permite una 
navegación fácil a través de una barra lateral y formularios claros 
para realizar operaciones CRUD en usuarios, cursos, temas y 
subtemáticas, además de generar reportes dinámicos.
Características:
- Acceso basado en roles: Cada usuario ve solo las opciones 
disponibles para su rol.
- Interfaz organizada: Cada sección se estructura en páginas 
específicas para una experiencia fluida.
- Componentización en React: Cada elemento (cursos, temas, 
subtemáticas, reportes) se maneja en componentes separados, 
permitiendo fácil mantenimiento y escalabilidad.
- Generación de reportes: Incluye funcionalidades para 
visualizar reportes en tablas dinámicas y gráficos interactivos.

## 3. Tabla de Contenidos
- Instalación y Ejecución
- Uso del Proyecto
- Reportes
- Créditos
- Licencia
- Información adicional proporcionada por React

## 4. Instalación y Ejecución del Proyecto
	1.	Clona el repositorio:
git clone <URL_DEL_REPOSITORIO_FRONTEND>
	2.	Instala las dependencias:
npm install
	3.	Ejecuta la aplicación:
npm start
La aplicación se ejecutará en http://localhost:3000.

## 5. Uso del Proyecto
El frontend se divide en secciones específicas de acuerdo al rol del 
usuario.

Roles y Funcionalidades:
- Alumnos: Pueden ver los cursos disponibles, inscribirse, registrar 
su progreso y calificar los cursos.
- Instructores: Pueden ver y gestionar los cursos que imparten, 
además de ver el progreso de sus alumnos en los cursos.
- Administradores: Tienen acceso completo para gestionar usuarios, 
cursos, temas y subtemáticas, así como generar reportes detallados.

Navegación y Componentes Principales:
- Gestión de Usuarios: Los administradores pueden ver, crear, editar 
y eliminar alumnos e instructores.
- Gestión de Cursos: Permite la creación, edición y eliminación de 
cursos, además de la asignación de instructores, temas y subtemáticas 
a cada curso.
- Gestión de Temas y Subtemáticas: Permite la creación, edición y 
eliminación de temas y subtemáticas para categorizar los cursos.
- Reportes: Los administradores pueden generar reportes de popularidad 
de temáticas y subtemáticas, inscripciones globales, y reportes filtrados 
según criterios específicos.

Autenticación y Autorización:
Al iniciar sesión, cada usuario recibe un token JWT que se almacena en 
localStorage y se utiliza para autenticar las solicitudes a las APIs 
protegidas.

## 6. Reportes
El frontend permite visualizar los reportes generados por el backend en 
tablas dinámicas y gráficos interactivos (gráficos de pastel). Los reportes 
disponibles son:

Reporte de Popularidad de Temáticas:
- Ruta: Popularidad de Temáticas
- Descripción: Permite visualizar las temáticas más populares basadas en 
las calificaciones e inscripciones recibidas.

Reporte de Porcentaje de Inscripciones:
- Ruta: Cantidad de Inscripciones Globales
- Descripción: Muestra el porcentaje de inscripciones por temática de forma 
gráfica y ordenada.

Reporte de Subtemáticas por Instructor:
- Ruta: Reporte Subtemáticas por Profesor
- Descripción: Al ingresar el correo de un instructor, se genera un reporte 
con las subtemáticas más populares que imparte, ordenadas por su índice de 
popularidad.
- Uso: Ingresar el correo del instructor en el campo de texto habilitado. 
Presionar el botón “Filtrar” para generar la tabla y gráfico.

Reporte con Filtros:
- Ruta: Filtrar Reportes con Calificación
- Descripción: Permite aplicar filtros personalizados como género y rango de 
edad para generar reportes de popularidad de temáticas.

Interacción con el Usuario:
- Cada reporte se selecciona mediante un botón en la sección de reportes del 
administrador.
- Los resultados se muestran en una tabla y se visualizan en un gráfico 
interactivo, haciendo más comprensible la información generada.

## 7. Créditos
Este proyecto fue desarrollado por Tomás Núñez Jaramillo. Se agradece a la comunidad 
de React y a los desarrolladores de recursos en línea que facilitaron el 
desarrollo de esta aplicación.

## 8. Licencia
Este proyecto está licenciado bajo la Licencia GPL. Esto permite a otros 
usuarios modificar y distribuir el proyecto bajo los mismos términos de la 
licencia GPL.

## 9. Información adicional proporcionada por React
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

