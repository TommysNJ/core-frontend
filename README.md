# Frontend - Sistema de Gestión de Cursos y Usuarios
## 1. Título del Proyecto
   Sistema de Gestión de Cursos y Usuarios - Frontend

## 2. Descripción del Proyecto
   Este es el frontend del sistema de gestión de cursos y usuarios. Desarrollado en React,
   el frontend proporciona una interfaz de usuario (UI) intuitiva y adaptada para cada tipo
   de usuario, ya sea alumno, instructor o administrador. El diseño permite una navegación
   fácil a través de una barra lateral y formularios claros para realizar operaciones CRUD
   en usuarios, cursos y temas.
   
   Características:
   - Acceso basado en roles: Cada usuario ve solo las opciones disponibles para su rol.
   - Interfaz organizada: Cada sección se estructura en páginas específicas para una
     experiencia fluida.
   - Componentización en React: Cada elemento (cursos, temas, inscripciones) se maneja en
     componentes separados, permitiendo fácil mantenimiento y escalabilidad.

## 3. Tabla de Contenidos
- Instalación y Ejecución
- Uso del Proyecto
- Créditos
- Licencia
- Información adicional proporcionada React

## 4. Instalación y Ejecución del Proyecto
1. Clona el repositorio:
   git clone <URL_DEL_REPOSITORIO_FRONTEND>
2. Instala las dependencias:
   npm install
3. Ejecuta la aplicación:
   npm start

   La aplicación se ejecutará en http://localhost:3000.


## 5. Uso del Proyecto
El frontend se divide en secciones específicas de acuerdo al rol del usuario:
Roles y Funcionalidades:
- Alumnos: Pueden ver los cursos disponibles, inscribirse, registrar su progreso y calificar
  los cursos.
- Instructores: Pueden ver y gestionar los cursos que imparten, y ver el progreso de sus
  alumnos en los cursos.
- Administradores: Tienen acceso completo para gestionar usuarios, cursos y temas, y pueden
  ver el listado completo de cada sección.

Navegación y Componentes Principales:
- Gestión de Usuarios: Los administradores pueden ver, crear, editar y eliminar alumnos e
  instructores.
- Gestión de Cursos: Permite la creación, edición y eliminación de cursos, además de la
  asignación de instructores y temas a cada curso.
- Gestión de Temas: Permite la creación, edición y eliminación de temas para categorizar los
  cursos.

Cada sección cuenta con formularios y listados dinámicos, que permiten gestionar los datos sin 
recargar la página. Las solicitudes se envían al backend utilizando Axios, y las respuestas se 
manejan de forma reactiva en el frontend.

Autenticación y Autorización:
Al iniciar sesión, cada usuario recibe un token JWT que se almacena en localStorage y se 
utiliza para autenticar las solicitudes a las APIs protegidas.


## 6. Créditos
Este proyecto fue desarrollado por Tu Nombre. Se agradece a la comunidad de React y a los 
desarrolladores de recursos en línea que facilitaron el desarrollo de esta aplicación.

## 7. Licencia
Este proyecto está licenciado bajo la Licencia GPL.


## 8. Información adicional proporcionada React
# Getting Started with Create React App

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
