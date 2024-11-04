<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Descripción

Este es un proyecto de ejemplo para Conexa utilizando el framework [Nest](https://github.com/nestjs/nest) con TypeScript.

## Configuración del Proyecto

Para configurar el proyecto, primero debes clonar el repositorio y luego instalar las dependencias:

```bash
$ git clone <URL_DEL_REPOSITORIO>
$ cd <NOMBRE_DEL_REPOSITORIO>
$ npm install

```
## Configuración de la Base de Datos y ENV

Debes tener algun cluster o base de datos en MongoDB Atlas, o en su defecto, una base de datos local.
Para configurar la base de datos, debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=<PORT> ## NO ES OBLIGATORIO
DB_URI_BACK=<URI_DE_LA_BASE_DE_DATOS>
JWT_SECRET=<SECRET_PARA_JWT>
JWT_EXPIRES_IN=<TIEMPO_DE_EXPIRACION_DEL_JWT>
```

## Ejecutar la aplicación

```bash
# development
$ npm run start:dev
$ npm run start:debug ## En caso de querer debuggear la aplicación
```

## Documentacion de la API

En la URL raiz de la aplicación, se encuentra la documentación de la API, la cual fue generada con Swagger.
Ademas puedes visitar el siguiente link donde encontraras los endpoints de la API:
<link>https://www.postman.com/joint-operations-physicist-86328592/workspace/my-workspace/collection/36006330-0d609ef9-507b-426e-a2e9-3a325b276db3?action=share&creator=36006330</link>

## Test

Para ejecutar los test, debes correr el siguiente comando:

```bash
# unit tests
$ npm run test
```




