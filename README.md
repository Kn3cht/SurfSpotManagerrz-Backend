# SurfspotFinderrz

NodeJs + Apollo Server + MongoDB boilerplate project.

## About

CRUD logic for surf spots.

## Setup

Clone the repository

```sh
git clone git@github.com:Kn3cht/SurfSpotManagerrz.git
```

Install all dependencies

```sh
yarn install
```

Generate ts for schema

```sh
yarn generate
```


**Env variables**
Set the following variables before running the project:
```txt
PORT=<local-deployment-only> 
MONGO_URL=<e.g. mongodb cluster> 
MONGODB_APPLICATION_DATABASE=<mongo-database>
MONGO_INITDB_ROOT_USERNAME=<mongo-root-username>
MONGO_INITDB_ROOT_PASSWORD=<mongo-root-password>

JWT_SECRET=<jqt-secret>
```

Run local dev instance
```sh
yarn dev
```

The gql endpoint can then be accessed via the url:

```
http://localhost:<env-port>/graphql
```
