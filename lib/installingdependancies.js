"use strict";/**
 * function to allow installation of dependancies
 */const path=require("path"),util=require("util"),{exec}=require("child_process"),execPromisified=util.promisify(exec),{chooseConsoleColorText,colorString}=require("./utils/consolecolors"),colorSet=require("./utils/colorsets"),{LinkedList}=require("./common-ds");/**
 * make use of linked list when installing dependancies
 * to make sure that the first dependancy is added 
 * before the second dependancy -> in order installation
 */class DependancyLinkedList extends LinkedList{constructor(){super()}async installDependancy(a,b){if(!this.head)console.log("No dependancies added to this linked list");else for(let c=this.head;c;){if(c.value){let d=c.value;console.log(`..........Starting to install ${d}`),await execPromisified(`cd ${b} && ${a} ${d}`),chooseConsoleColorText(colorSet.normal,`\n Installed ${colorString(colorSet.log,`${d}`)} in the application.`)}// move current to the next node
c=c.next}}// run any operations/commands such as git init
runFinalCommands(a){if(!this.head)console.log("No commands to run");else for(let b=this.head;b;){if(b.value){let c=b.value;console.log(`.......Running command: ${c}`),execPromisified(`cd ${a} && ${c}`)}// move current to the next node
b=b.next}}}const installingDependancies=async a=>{const{appName:b,framework:c,database:d,orm:e,testFramework:f,expectationLibrary:g}=a,h=path.basename(b);// database adapters used in SQL.
let i;"sqlite"===d.toLowerCase()?i="sqlite3":"postgres"===d.toLowerCase()&&(i="pg");const j=await execPromisified("echo \"\n Going to start installing dependancies now\"");chooseConsoleColorText(colorSet.log,`\n ${j.stdout}`);const k=["body-parser","dotenv","cors","bcrypt",`${c.toLowerCase()}`,`${e&&"No ORM"!==e?`${e.toLowerCase()}`:""}`,`${i?`${i}`:""}`],l=[`${f?`${f.toLowerCase()}`:""}`,`${g?`${g.toLowerCase()}`:""}`,"chai-http","nyc","@babel/core","@babel/preset-env","@babel/cli","@babel/node","@babel/register","standard"],m=new DependancyLinkedList;await m.addAll(k),await m.installDependancy("npm install",h);// install all dev dependancies
const n=new DependancyLinkedList;// add all dev dependancies to list
await n.addAll(l),await n.installDependancy("npm install -D",h);// operations to run after installation of dependancies
const o=new DependancyLinkedList;// install all if not added to node_modules
await o.addAll(["npm run fix","npm install","git init","git add .","git commit -m \"initial set up"]),process.on("exit",async()=>{// run linter fix, npm install & git operations
await o.runFinalCommands(h),chooseConsoleColorText(colorSet.normal,`\n Successfully created the application`)})};module.exports=installingDependancies;