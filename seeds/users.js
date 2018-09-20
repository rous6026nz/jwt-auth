
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then( () => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'zaine82', hash: 'hello3v3ry80dy'}
      ])
    })
}
