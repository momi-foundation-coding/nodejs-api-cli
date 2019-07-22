set -e 

echo We are installing dependancies, please wait...
npm install express body-parser cors 

echo All dependancies installed 

echo Install dev dependancies, please wait...
npm install -D @babel/cli @babel/core @babel/node @babel/preset-env
