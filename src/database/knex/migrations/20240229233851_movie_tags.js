exports.up = knex => knex.schema.createTable('movie_tags', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('note_id').references('id').inTable('movie_notes').notNullable();
    table.integer('user_id').references('id').inTable('users').notNullable();
  
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());  
  });
  
  exports.down = function(knex) {
    
  };