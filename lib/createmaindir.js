"use strict";/**
 * func to create the main directory
 * later we can allow user to manipulate if app is already existing
 * such as adding more controllers or tables/models
 */const fs=require("fs"),path=require("path"),createSrcDirAndFiles=require("./createsrcdirandfiles"),{chooseConsoleColorText}=require("./utils/consolecolors"),colorSet=require("./utils/colorsets"),createMainDir=a=>{const{appName:b,tests:c,orm:d,database:e}=a;fs.mkdir(b,a=>{if(a)chooseConsoleColorText(colorSet.error,"\n\n--------There is a file with the same name chosen-----------\n"),process.exit(0);else{const a=path.basename(b);createSrcDirAndFiles({appBaseDirectory:a,tests:c,database:e,orm:d})}})};module.exports=createMainDir;