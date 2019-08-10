# kemboijs-cli  ![npm](https://img.shields.io/npm/dt/kemboijs-cli) ![David](https://img.shields.io/david/kemboijs/kemboijs-cli)
When developing API based application in NodeJS, it is not easy to set it up as easy as possible. 
The application include but not limited to applications build using Express, Sails.js, kemboijs, Koa.js, hapi, AdonisJS, Nest.js etc. 
We decided to build this library/utility to help faster set up your API based application. 
In the fisrt release, We will focus on supporting Express, but will imrpove on other frameworks and also nodejs itself without use of frameworks. 
Also, we will aim at building utility that can enhance faster development of upcoming applications, building controllers, middlewares and also fixing issues on migrations in the near future.

# How to use

- Install: `npm i -g kemboijs-cli`
- Create app: `kemboijs-cli myapp`
- Run app: `npm start`
- Drop tables: `npm run drop:db`
- Create tables: `npm run create:db`
- Run tests: `npm test`

NB: When installing make sure you have admin priviledges otherwise, you will have to use `sudo npm i -g kemboijs-cli`

## Edit Database details
Navigate to `src/models/setup.js`, edit the database name, username or password. 

You can also add these credentials to the `.env` file.
```javascript
  export DATABASE_URL = "postgres://user:pass@example.com:5432/dbname"
  export TEST_DB = "postgres://user:pass@example.com:5432/testdb"
```

In your `src/models/setup.js` file:
```javascript
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env === 'test' ? process.env.TEST_DB : process.env.DATABASE_URL;
const sequelize = new Sequelize(dbUrl);
```

You can now call or edit the database models. The created model is **User**, under `src/models/user.js`

# Folder Structure (More updates expected)
    ├── src                   
    │   ├─ config  
    |       ├─ index.js
    │   ├─ controllers  
    |       ├─ index.js
    |       ├─ user.js
    │   ├─ middlewares      
    |       ├─ index.js  
    |       ├─ user.js  
    │   ├─ models          
    |       ├─ index.js
    |       ├─ user.js 
    |       ├─ setup.js 
    |   └─ routers 
    |       ├─ index.js
    |       ├─ user.js  
    |   └─ scripts 
    |       ├─ createdb.js
    |       ├─ dropdb.js  
    |       ├─ index.js  
    ├── test                  
    │   ├─ index.js           
    │   
    └── index.js
    └── README.md
    └── package.json

# Contributors
<a href="https://github.com/kemboijs/kemboijs-cli/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=kemboijs/kemboijs-cli" width="100"/>
</a>

# How To Contribute
In general, we follow the "fork-and-pull" Git workflow.

1. Fork this [repo](https://github.com/kemboijs/kemboijs-cli.git) on GitHub
2. Clone the forked repo locally
3. Work on your fork
    - Make your changes and additions
    - Change or add tests if needed
    - Add changes to README.md if needed
4. Commit changes to your own branch
5. Make sure you merge the latest from "upstream" and resolve conflicts if there is any
6. Push your work back up to your fork
7. Submit a Pull request so that we can review your changes


# Licence 

[MIT](https://github.com/kemboijs/kemboijs-cli/blob/master/LICENSE)
