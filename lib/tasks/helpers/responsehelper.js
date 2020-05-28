"use strict";const responseHelper=`
/**
 * @static
 * @param {response}  response object
 * @param {message}  message
 * @param {data}  data
 * @param {status}  status code
 * @returns {object} object
*/
export default (res, message, status, data) => {
  res.status(status).send({
    message,
    data,
  });
}
`;module.exports="\n/**\n * @static\n * @param {response}  response object\n * @param {message}  message\n * @param {data}  data\n * @param {status}  status code\n * @returns {object} object\n*/\nexport default (res, message, status, data) => {\n  res.status(status).send({\n    message,\n    data,\n  });\n}\n";