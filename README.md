# profile-management-api
API for Profile Management.

This is a NodeJS/expressJS application. It uses a cosmos database in order to provide service to users when parameters/data provided. Please see swagger doc.

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
```PORT```:  port for running the server fo local dev 3001

```NODE_ENV```:  specify environment prod or test or dev

```COSMOS_KEY```:  Cosmos Database key

```COSMOS_PORT```:  Cosmos Database port

```COSMOS_DB_NAME```:  Cosmos Database server name

Once deployed, use postman collection(found in the root directory) to add user's personal info. Once user added, provide the url `<URL>/api/v1` to front-end so that it can be added to environment variable. for next project, environemt variable will be set as NEXT_PUBLIC_BASE_API_URL.

developer can checkout the code and set the above environment variables in .env file and start the server using above command for dev environment.

for now, swaggar is available when NODE_ENV is set as "dev". 
 
## Swagger 
Swagger is available `<URL>/api/v1/api-docs`. 

