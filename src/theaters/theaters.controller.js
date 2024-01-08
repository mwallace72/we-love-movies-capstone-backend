const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response, next) {
  // TODO: Add your code here
  service
    .list()
    .then((data) => response.json({ data }))
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
};
