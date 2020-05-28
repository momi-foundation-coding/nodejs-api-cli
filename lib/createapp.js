#!/usr/bin/env node
/**
 * Nodejs internal modules
 */ /**
 * External dependancies installed through npm
 */"use strict";const{version}=require("../package.json"),{chooseConsoleColorText}=require("./lib/utils/consolecolors"),colorSet=require("./lib/utils/colorsets"),installingDependancies=require("./lib/installingdependancies"),createMainDir=require("./lib/createmaindir"),createRouteDirFiles=require("./lib/createroutedirfile"),{promptAppName,promptFrameworkDb,promptOrm,promptTest,promptTestRunner}=require("./lib/utils/inquirer"),createApp=async a=>{const{appName:b,framework:c,database:d,orm:e,tests:f,testFramework:g,expectationLibrary:h}=a;await createMainDir({appName:b,tests:f,orm:e,database:d}),await createRouteDirFiles(b,d),await installingDependancies({appName:b,framework:c,database:d,orm:e,testFramework:g,expectationLibrary:h})},args=process.argv.slice(2);/**
 * Internal imports goes here
 */ // Convert into a module that can be used as CLI
// eslint-disable-next-line consistent-return
args.forEach(async a=>{/**
   * Can this be tested?
   * E.g ensure that an application is created
   */if(!a)chooseConsoleColorText(colorSet.error,"------\nValue is required  e.g nodejs-api-cli init--------\n"),process.exit(0);else if("version"===a||"-v"===a)chooseConsoleColorText(colorSet.normal,version);else if("help"===a||"-h"===a)chooseConsoleColorText(colorSet.normal,"New Project: nodejs-api-cli init\n"),chooseConsoleColorText(colorSet.normal,"Help: nodejs-api-cli help or nodejs-api-cli -- -h\n"),chooseConsoleColorText(colorSet.normal,"Version: nodejs-api-cli version or nodejs-api-cli -- -v\n"),chooseConsoleColorText(colorSet.normal,"Documentation: https://kemboijs.github.io/kemboijs.org/\n");else{if("init"===a){const a=await promptAppName(),b=await promptFrameworkDb(),{database:c}=b,d=[];"Postgres"===c?d.push("Sequelize","No ORM"):"Sqlite"===c?d.push("Sequelize"):"MongoDB"===c?d.push("mongoose"):(chooseConsoleColorText(colorSet.error,"\n------Error occurred while collecting database details------\n"),process.exit(0));const e=await promptOrm(d),f=await promptTest();let g;const{tests:h}=f;if(h)g=await promptTestRunner();else return createApp({...a,...b,...e,tests:h});// send details of app
return createApp({...a,...b,...e,tests:h,...g})}chooseConsoleColorText(colorSet.error,"\n------Value entered is wrong. Use -- e.g nodejs-api-cli -- -h --------\n"),process.exit(0)}});