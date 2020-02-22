const responseHelper = `
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
    }`
  exports = module.exports = responseHelper;