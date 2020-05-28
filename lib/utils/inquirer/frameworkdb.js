"use strict";const{prompt}=require("inquirer"),promptFrameworkDb=()=>prompt([{type:"list",name:"framework",message:"Which framework do you want to use?",/**
       * Need to add more choices e.g
       * choices: ['Express', 'KemboiJs', 'Koa'],
       */choices:["Express"],default:"Express"},{type:"list",name:"database",message:"Which database do you want to use?",/**
       * Need to add more choices e.g
       * choices: ['Postgres', 'MongoDB', 'Sqlite],
       */choices:["Postgres","Sqlite","MongoDB"],default:"Postgres"}]);module.exports=promptFrameworkDb;