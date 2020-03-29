/**
 * This file contains all the color sets present
 * Such as for warning, we have yellow, then error is red
 */

/**
 * Color sets for different console messages
 * More colors can be added.
 */
const colorSet = {
  reset: "\x1b[0m", // Reset to setted color
  normal: "\x1b[0m", // Setting color, the same as reset value
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  log: "\x1b[34m", // Blue
};

module.exports = colorSet;
