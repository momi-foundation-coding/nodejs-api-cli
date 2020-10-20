const readMe = (name) =>
  `# ${name.charAt(0).toUpperCase() + name.slice(1)}
This is ${name} generated using nodejs-api-cli

# Project setup
npm install

# Compile and Run
npm start

# Build application
npm build

# Run your tests
npm test
`;

module.exports = readMe;
