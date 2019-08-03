# kemboijs-cli  ![npm](https://img.shields.io/npm/dt/kemboijs-cli) ![David](https://img.shields.io/david/kemboijs/kemboijs-cli)
When developing API based application in NodeJS, it is not easy to get it up set up as easy as possible. 
The application include but not limited to applications build using Express, Sails.js, kemboijs, Koa.js, hapi, AdonisJS, Nest.js etc. 
We decided to build this library/utility to help faster set up you API based application. 
In the fisrt release, I will focus on supporting Express, but will imrpove on other frameworks and also nodejs itself without use of frameworks. 
Also, we will aim at building utility that can enhance faster development of upcoming applications, building controllers, middlewares and also fixing issues on migrations in the near future.

# How to use

- Install `npm i -g kemboijs-cli`
- Create app `kemboijs-cli myapp`

NB: When installing make sure you have admin priviledges otherwise, you will have to use `sud npm i -g kemboijs-cli`

# Folder Structure (More updates expected)
```bash
├── src                   
    │   ├── config  
    |       ├── index.js
    │   ├── controllers  
    |       ├── index.js
    │   ├── middlewares      
    |      ├── index.js    
    │   ├── models          
    |       ├── index.js
    |   └── routers 
    |      ├── index.js
    |
    ├── test                  
    │   ├── index.js           
    │   
    └── app.js
    └── README.md
    └── package.json
```

# Contributors
<a href="https://github.com/kemboijs/kemboijs-cli/graphs/contributors">
  <img src="https://contributors-img.firebaseapp.com/image?repo=kemboijs/kemboijs-cli" width="100"/>
</a>

# Licence 

[MIT](https://github.com/kemboijs/kemboijs-cli/blob/master/LICENSE)
