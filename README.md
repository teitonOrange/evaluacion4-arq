# Proyecto: CRUD de Usuarios con NestJS

## Descripción
Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) para la gestión de usuarios utilizando el framework [NestJS](https://github.com/nestjs/nest). 

Incluye las siguientes características principales:

- **Cumplimiento de Códigos HTTP:**
  - **201:** Cuando se crea un usuario exitosamente.
  - **400:** Para solicitudes mal formadas, como la falta de atributos obligatorios o cuando el correo electrónico ya está registrado.
  - **404:** Cuando se intenta acceder a un usuario inexistente.
  - **410:** Cuando algun recurso he sido eliminado.
  - **500:** Para errores inesperados del servidor.
  
- **Cumplimiento del acceso mediate un token:**
  - **Seguridad:** Es necesario proporcionar el token de acceso mediante los header de la solicitud


El proyecto está desarrollado con una estructura modular, siguiendo las mejores prácticas de NestJS para asegurar escalabilidad y mantenibilidad.

---

## Tecnologías Utilizadas
- **NestJS:** Framework principal para la construcción del proyecto.
- **TypeScript:** Lenguaje utilizado para una escritura más robusta y mantenible.
- **SQLite:** Base de datos ligera, almacenada localmente en el archivo `dev.db`.
- **Prisma ORM:** Para la gestión de la base de datos, modelado y consultas eficientes.
- **Class-validator y Class-transformer:** Para validar las entradas de las solicitudes y asegurar la integridad de los datos.

---

## Configuración del Proyecto

### Instalación
Primero, clona el repositorio y ejecuta el siguiente comando para instalar las dependencias:

    ```bash
    $ npm install
    $ npm install dotenv
    $ npm run build
    $ npm prisma generate

## Compilación y Ejecución

Dependiendo del entorno, puedes usar los siguientes comandos para iniciar el proyecto:

Desarrollo: 

    ```bash 
    $ npm run start

Modo Watch (Desarrollo Continuo):

    ```bash 
    $ npm run start:dev

Producción:

    ```bash 
    $ npm run start:prod
