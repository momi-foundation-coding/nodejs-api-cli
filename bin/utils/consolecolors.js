/**
 * This file contains colors for console.log.
 * This can be setting console log error, warnings or success
 */
const colorSet = require("./colorsets");

/**
 * Set the text to the color passed
 * Also, it sets reset here
 */
const colorString = (color, string) => {
  // Return the color for the console but reset color
  return `${color}${string}${colorSet.reset}`;
};

// Console log your chosen color and string
const chooseYourColorText = (color, string) => {
  console.log(colorString(color, string));
};

module.exports = chooseYourColorText;
