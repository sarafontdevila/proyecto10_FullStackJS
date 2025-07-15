# proyecto10_Backend

# 🎉 Plataforma de Eventos

Es una plataforma web donde los usuarios pueden iniciar sesión, explorar eventos disponibles, escoger asistir, tener su propia sección de eventos escogidos, crear eventos y poder ver una lista con los usuarios que van a asistir.
Hay dos roles el usuario y administrador. El administrador puede ver la lista completa de los asistentes y todos los eventos creados, tambien puede editarlos y borrarlos.


## 🚀 Características

- Autenticación de usuarios
- Home: se ven todos los eventos y se invita al usuario a registrarse si no está logueado
- Usuario: 1) crear, actualizar y borrar sus eventos si es usuario autentificado. 2) acceso a lista asistentes de sus eventos
- Administrador: 1)crear, actualizar y borrar todos eventos si es usuario autentificado. Acceso a la lista de asistentes de todos los eventos.2) acceso a la lista asistente de todos los eventos


## 🛠️ Tecnologías

- **Backend:** Node.js / Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Encriptación de contraseñas:** Bcrypt
- **Frontend:** Javascript Vanille
- **Seguridad y configuración de acceso:** CORS
- **Herramienta de desarrollo:** Nodemon

## 🔧 Instalación

```bash
git clone [https://github.com/sarafontdevila/proyecto10_front.git](https://github.com/sarafontdevila/proyecto10_front.git)
git clone [https://github.com/sarafontdevila/proyecto10_FullStackJS.git](https://github.com/sarafontdevila/proyecto10_FullStackJS.git)
cd eventos
npm install
npm run dev

📋 Endpoints API

🔐 Autenticación
Método	Endpoint	Descripción	Body (JSON)
POST	/auth/register	Registrar un nuevo usuario	{ "nombre": "", "email": "", "password": "" }
POST	/auth/login	Iniciar sesión	{ "email": "", "password": "" }

👤 Endpoints de Usuario
Método	Endpoint	Descripción	Body requerido	Autenticación

POST	/users/register	Registrar un nuevo usuario	{ "nombre": "", "email": "", "password": "" }	
POST	/users/login	Iniciar sesión del usuario	{ "email": "","password": "" }	

📁 Endpoints de Eventos

🔸 Eventos
Método	Endpoint	Descripción	Autenticación	Body / Detalles

GET	/eventos/	Obtener todos los eventos	
GET	/eventos/:id	Obtener un evento por ID	
POST	/eventos/	Crear un nuevo evento; multipart/form-data con campo imagen
PUT	/eventos/:id	Actualizar un evento; multipart/form-data con campo imagen
DELETE	/eventos/:id	Eliminar un evento	
GET	/eventos-creados	Obtener eventos creados por el usuario	

👥 Asistentes
Método	Endpoint	Descripción	Autenticación	Body / Detalles

PUT	/eventos/:id/asistentes	Añadir usuario autenticado como asistente	
DELETE	/eventos/:id/asistentes/:userId	Quitar asistente por ID	
GET	/eventos/:id/asistentes	Obtener lista de asistentes del evento

## 📄 Licencia
---
Copyright © 2025 Sara Fontdevila!
