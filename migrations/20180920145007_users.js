
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('username').unique()
      table.string('hash')
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
