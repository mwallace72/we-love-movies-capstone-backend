const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  service
    .read(request.params.reviewId)
    .then((review) => {
      if (review) {
        response.locals.review = review;
        return next();
      }
      next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

async function destroy(request, response, next) {
  // TODO: Write your code here
  service
    .destroy(response.locals.review.review_id)
    .then(() => response.sendStatus(204))
    .catch(next);
}

async function list(request, response, next) {
  // TODO: Write your code here
  // console.log(request.params.movieId)
  service
    .list(request.params.movieId)
    .then((data) => {
      console.log(data)
      response.json({ data })
    })
    .catch(next);
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response, next) {
  // TODO: Write your code here
  const updatedReview = {
    ...request.body.data,
    review_id: response.locals.review.review_id,
  };
  service
    .update(updatedReview)
    .then((data) => response.json({ data }))
    .catch(next);
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
