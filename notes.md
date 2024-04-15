# APEX MALL

> apex(n) - The top or highest part of something. I named this website Apex Mall because I want it to mean the best and the highest quality and service

### NOTES

1. To run the backend and frontend together we need **nomemon & concurrent** to be installed

   > npm i -D nodemon concurrently
   > If we don't use nodemon, whenever we make change to the server, we should keep restarting it again and again.

2. To implement the command to run both sides, we should enter the following commands to the _package.json_ in the root folder:

```
"scripts": {
    "start": "node backend/server",
    "server": "nodemon backend/server",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
```

3. To use ES6 module, we should add :

```
"type": "module"
```

Then we can use _import_ and _export_ rather than _require_ syntax. 
> Note! If *js* file is imported **.js** extension must be included in import syntax

4. To configure the environment, we include the following in server.js file: 
> dotenv.config()
 
5. MongoDB is a document database, not relational databse. A document is a json object.

211.210.172.62/32

6. Compass - GUI(graphical user interface) for MongoDB
7. Redux Implementation Flow
```
1. REDUCERS - create reducers you need
2. CONSTANTS - to use type variable without quotes everytime we need, we include them in constants
3. STORE - add reducer to the store
4. ACTIONS - work on actions to perform a certain functionality
```

8. getState - is used to dispatch the state of all reducers
9. JWT - JSON Web Tokens
> npm i jsonwebtoken

