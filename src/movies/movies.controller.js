const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  // console.log('checking movie exists', request.params.movieId)
  service
    .read(request.params.movieId)
    .then((movie) => {
      if (movie) {
        response.locals.movie = movie;
        return next();
      }
      next({ status: 404, message: `Movie ${request.params.movieId} cannot be found.` });
    })
    .catch(next);
}

async function read(request, response) {
  // TODO: Add your code here
  const { movie: data } = response.locals;
  response.json({ data });
}

async function list(request, response, next) {
  // TODO: Add your code here.
  service
    .list(request.query.is_showing)
    .then((data) => response.json({ data }))
    .catch(next);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists
};
