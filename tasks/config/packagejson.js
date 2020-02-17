// Package file data.
const packageJson = name => ({
    name: `${name}`,
    version: "1.0.0",
    main: "index.js",
    scripts: {
        start: "babel-node src/index.js",
        test: "nyc --reporter=text mocha --require @babel/register --exit",
        "create:db": "babel-node src/scripts/createdb.js",
        "drop:db": "babel-node src/scripts/dropdb.js"
    }
});

exports = module.exports = packageJson;
