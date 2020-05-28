"use strict";/**
 * creating routes directory files
 * @param {*} name
 */const fs=require("fs"),openAppendFile=require("./openandappendfile"),{packageJson,gitIgnore,readMe,envExample,license}=require("./tasks"),createRouteDirFiles=(a,b)=>{// Create different files such as packages, readme etc.
const c=fs.createWriteStream(`${a}/package.json`),d=fs.createWriteStream(`${a}/.gitignore`),e=fs.createWriteStream(`${a}/.env`),f=fs.createWriteStream(`${a}/README.md`),g=fs.createWriteStream(`${a}/.envexample`),h=fs.createWriteStream(`${a}/LICENSE`),i=JSON.stringify(packageJson(a),null,"\t"),j=readMe(a),k=[{pathname:c.path,data:i},{pathname:d.path,data:gitIgnore},{pathname:f.path,data:j},{pathname:e.path,data:envExample(b)},{pathname:g.path,data:envExample(b)},{pathname:h.path,data:license}];// For each file, append data using fn openAppendFile
k.forEach(a=>{openAppendFile(a.pathname,a.data)})};module.exports=createRouteDirFiles;