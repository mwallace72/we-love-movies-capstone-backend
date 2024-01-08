const tableName = "movies"

exports.up = function(knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments("movie_id").primary(); // Sets supplier_id as the primary key
        table.string("title");
        table.integer("runtime_in_minutes");
        table.enum("rating", ["G", "PG", "PG-13", "R", "NC-17", "NR"]);
        table.text("description");
        table.string("image_url");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
