"use strict";/**
 * This file contains all the color sets present
 * Such as for warning, we have yellow, then error is red
 */ /**
 * Color sets for different console messages
 * More colors can be added.
 */const colorSet={reset:"\x1B[0m",// Reset to setted color
normal:"\x1B[0m",// Setting color, the same as reset value
warn:"\x1B[33m",// Yellow
error:"\x1B[31m",// Red
log:"\x1B[34m"// Blue
};module.exports=colorSet;