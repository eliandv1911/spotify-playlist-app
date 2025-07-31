# SpotifyPlaylistApp 🎵

Aplicación web desarrollada con [Angular v20](https://angular.dev/) que permite buscar canciones en Spotify, agregarlas a listas de reproducción personalizadas y almacenarlas en Firebase. Incluye autenticación de usuarios con Firebase.

## 📥 Clonar el proyecto

```bash
git clone https://github.com/eliandv1911/spotify-playlist-app.git
cd SpotifyPlaylistApp
```

## 📦 Instalación de dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) y [Angular CLI](https://angular.dev/tools/cli) instalados.

```bash
npm install
```

## 🚀 Desarrollo local

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Una vez esté en ejecución, abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al detectar cambios en los archivos fuente.

## 🛠️ Generación de componentes

Puedes generar componentes, servicios u otros elementos usando el Angular CLI:

```bash
ng generate component component-name
```

Para ver todos los esquemas disponibles:

```bash
ng generate --help
```

## 📦 Compilación para producción

Para compilar la aplicación en modo producción:

```bash
ng build
```

Los archivos compilados se guardarán en el directorio `dist/`.

## 🚀 Despliegue en Firebase

La aplicación fue desplegada en Firebase Hosting y está disponible en el siguiente enlace:

🔗 [https://angular-spotify-d80b4.web.app/search](https://angular-spotify-d80b4.web.app/search)  

## 📌 Consideraciones importantes

- Es necesario tener Node.js y Angular CLI instalados globalmente.
- Para el correcto funcionamiento de la autenticación y almacenamiento de listas, se requierió de una cuenta de Firebase configurada con:
  - Autenticación por correo y contraseña habilitada.
  - Firestore como base de datos.
- El acceso a la API de Spotify con un token válido. Este se obtuvo a través del flujo de autorización correspondiente en Spotify.
- Este proyecto no incluye pruebas automatizadas.
- El entorno fue desarrollado y probado localmente con Angular v20.1.3.

## 📚 Recursos adicionales

- [Documentación oficial de Angular CLI](https://angular.dev/tools/cli)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Spotify for Developers](https://developer.spotify.com/documentation/web-api/)
