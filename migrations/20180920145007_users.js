
exports.up = (knex, Promise) => {
  knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username').unique()
    table.string('hash')
  })
}

exports.down = (knex, Promise) => {
  knex.schema.dropTable('users')
}
