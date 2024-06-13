<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Requirements
Task requirements can be found [here](REQUIREMENTS)


## Check it out: https://task-manager-api-o14f.onrender.com
###### ▶ (note that app use free instance that spins down with inactivity that can delay first request by 50+ seconds)


## Docs (Swagger)
###### Could be found by next URL:
```sh
$ http://localhost:8001/ # Local environment
$ https://task-manager-api-o14f.onrender.com # Production
```


## Basic test case
<details>
<summary>Create a new user, add project and task, get all tasks with filter</summary>
1. Create a new user

```bash
  curl --location 'http://localhost:8001/api/auth/register' \
  --header 'Content-Type: application/json' \
  --data '{
      "email": "user_100@mail.com",
      "password": "123123"
  }'
```

2. Create a new project

```bash
  curl --location 'http://localhost:8001/api/users/6669c0c849dc111f981c3191/projects' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfMUBtYWlsLmNvbSIsInVzZXJJZCI6IjY2NjljMGM4NDlkYzExMWY5ODFjMzE5MSIsImlhdCI6MTcxODIyNzYxMCwiZXhwIjoxNzE4MzE0MDEwfQ.QDUa1i_KGHbADLghEMmvSuj4m2DwI2vahCmM9kCZJM0' \
  --data '{
      "name": "project name",
      "description": "project description"
  }'
```

3. Create a new task

```bash
  curl --location 'http://localhost:8001/api/users/6669c0c849dc111f981c3191/projects/666a1b880f8bf34c534b394c/tasks' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfMUBtYWlsLmNvbSIsInVzZXJJZCI6IjY2NjljMGM4NDlkYzExMWY5ODFjMzE5MSIsImlhdCI6MTcxODIyNzYxMCwiZXhwIjoxNzE4MzE0MDEwfQ.QDUa1i_KGHbADLghEMmvSuj4m2DwI2vahCmM9kCZJM0' \
  --data '{
      "title": "task_100",
      "description": "description",
      "status": "new",
      "projectId": "666a1b880f8bf34c534b394c"
  }'
```

4. Get tasks with filter

```bash
  curl --location 'http://localhost:8001/api/users/6669c0c849dc111f981c3191/projects/666a1b880f8bf34c534b394c/tasks?status=in_progress' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJfMUBtYWlsLmNvbSIsInVzZXJJZCI6IjY2NjljMGM4NDlkYzExMWY5ODFjMzE5MSIsImlhdCI6MTcxODIyNzYxMCwiZXhwIjoxNzE4MzE0MDEwfQ.QDUa1i_KGHbADLghEMmvSuj4m2DwI2vahCmM9kCZJM0' \
```

</details>


## Run locally
<details>
<summary>Install dependencies and run app</summary>

#### Requires [Node.js](https://nodejs.org/) v14+ to run and .env files provided for client and server sides.

###### 1. Run commands from the root directory:
```sh
$ npm install
$ npm run start:dev
```
###### 2. Run tests (optional):
```sh
$ npm run test
```
</details>
