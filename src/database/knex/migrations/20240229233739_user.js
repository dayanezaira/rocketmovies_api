
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('name').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.text('avatar');
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable('users');