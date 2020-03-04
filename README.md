<center>

![npm](https://img.shields.io/npm/dt/nodejs-api-cli)
![npm](https://img.shields.io/npm/v/nodejs-api-cli)
![npm](https://img.shields.io/static/v1?label=PR&message=Welcome&color=brightgreen)

</center>

# nodejs-api-cli

When developing API based application in NodeJS, it is not easy to set it up as easy as possible.
The application include but not limited to applications build using Express, Sails.js, kemboijs, Koa.js, hapi, AdonisJS, Nest.js etc.
We decided to build this library/utility to help faster set up your API based application.
In the fisrt release, We will focus on supporting Express, but will improve on other frameworks and also nodejs itself without use of frameworks.
Also, we will aim at building utility that can enhance faster development of upcoming applications, building controllers, middlewares and also fixing issues on migrations in the near future.

# How to use

- Install: `npm i -g nodejs-api-cli`
- Create app: `nodejs-api-cli init`
  - Follow the steps and select your options
- Run app: `npm start`
- Drop tables: `npm run drop:db`
- Create tables: `npm run create:db`
- Run tests: `npm test`

NB: When installing make sure you have admin priviledges otherwise, you will have to use `sudo npm i -g nodejs-api-cli`

Steps:

- Get help `nodejs-api-cli -- -h` or `nodejs-api-cli help`
- Get version of app `nodejs-api-cli -- -v` or `nodejs-api-cli version`

## Edit Database/.env details

The app generates `.env` file, where you need to edit its credentials

```javascript
DATABASE_URL = "postgres://user:pass@example.com:5432/dbname";
TEST_DB = "postgres://user:pass@example.com:5432/testdb";
NODE_ENV = "development";
```

You can now create, drop any database models. The created model is **User**, under `src/models/user.js`

# Noted Items

- License added is default `ISC`. You can change it inside `my-app-name/package.json` and also add `LICENSE` file.
- Repository is assumed to be of type `git` and its `url` left blank for you to set inside `my-app-name/package.json`
- Also, feel free to modify or remove some items to meet your expectation/demand

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
    │     ├─ controllers
    │         ├─ index.js
    │         ├─ user.js
    │     ├─ middleware
    │         ├─ index.js
    │     ├─ routes
    │         ├─ index.js
    │     └─ index.js
    │
    └── index.js
    └── README.md
    └── package.json

# Contributors

<a href="https://github.com/kemboijs/nodejs-api-cli/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=kemboijs/nodejs-api-cli" width="100"/>
</a>

# How To Contribute

In general, we follow the "fork-and-pull" Git workflow.

1. Fork this [repo](https://github.com/kemboijs/nodejs-api-cli.git) on GitHub
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

[MIT](https://github.com/kemboijs/nodejs-api-cli/blob/master/LICENSE)
