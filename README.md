# profile-management-api
API for Profile Management.

This is a NodeJS/expressJS application. It uses a ms sql database in order to provide service to users when parameters/data provided. Please see swagger doc.

Step 1. Install npm dependencies
```bash 
$ npm install
```  

Step2. Run the application 
```bash
# run in dev environment
$ npm run dev
# run when deployed  
$ npm run start
```


## Other Commands

`npm run lint`: linting code 

`npm run test`: runs tests

## Environment Variables 
```PORT```:  port for running the server

```NODE_ENV```:  specify environment prod or test or dev

```ACCESS_TOKEN_SECRET```:  generated token secret for now

```DB_USER```:  Database user

```DB_PASS```:  Database password

```DB_SERVER```:  Database Server

```DB_NAME```:  Database name

 
## Swagger 
Swagger is available `<URL>/api/v1/api-docs`. 

