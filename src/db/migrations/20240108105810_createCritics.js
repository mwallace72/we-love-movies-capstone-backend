const tableName = "critics"

exports.up = function(knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments("critic_id").primary(); // Sets supplier_id as the primary key
        table.string("preferred_name");
        table.string("surname");
        table.string("organization_name");
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
