const db = require("../db/connection");
const tableName = "movies"
async function list(is_showing) {
  return db(tableName)
    .select(tableName+".*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            tableName+".movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy(tableName+".movie_id");
      }
    });
}

async function read(movie_id) {
  // TODO: Add your code here
  return db(tableName).select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
};
