"use strict";/**
 * This file contains colors for console.log.
 * This can be setting console log error, warnings or success
 */const colorSet=require("./colorsets"),colorString=(a,b)=>`${a}${b}${colorSet.reset}`,chooseConsoleColorText=(a,b)=>{console.log(colorString(a,b))};/**
 * Set the text to the color passed
 * Also, it sets reset here
 */module.exports={chooseConsoleColorText,colorString};