// middleware/index.js
const messageMiddleware = require('./message');
const errorHandlingMiddleware = require('./errorHandling');
const authenticatedTransferMiddleware = require('./authenticatedTransfer');

module.exports = {
  messageMiddleware,
  errorHandlingMiddleware,
  authenticatedTransferMiddleware,
  // Add other middleware here
};
