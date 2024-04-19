exports.up = knex => knex.schema.createTable('movie_notes', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description');
    table.integer('rating').defaultTo(0).notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
  
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable('movie_notes');