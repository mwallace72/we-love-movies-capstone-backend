const tableName = "theaters"

exports.up = function(knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments("theater_id").primary(); // Sets supplier_id as the primary key
        table.string("name");
        table.string("address_line_1");
        table.string("address_line_2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
