const imgService = {

  getAllImages(knex) {
    return knex.select('*').from('images')
  },
  insertImage(knex, newImage) {
    return knex
      .insert(newImage)
      .into('images')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getImageById(knex, id) {
    return knex.from('images').select('*').where('id', id).first()
  },
  deleteImage(knex, id) {
    return knex('images')
      .where({ id })
      .delete()
  },
}

module.exports = imgService